"""BSD 2-Clause License

Copyright (c) 2022, Allied Vision Technologies GmbH
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""
import os    
import xmltodict
from time import time
from datetime import date


import sys
import threading
from typing import Optional

import cv2

from vmbpy import *

# All frames will either be recorded in this format, or transformed to it before being displayed
opencv_display_format = PixelFormat.Bgr8


def print_preamble():
    print('///////////////////////////////////////////////////')
#    print('/// VmbPy Asynchronous Grab with OpenCV Example ///')
    print('///////////////////////////////////////////////////\n')


def print_usage():
    print('Usage:')
    print('    python asynchronous_grab_opencv.py [camera_id]')
    print('    python asynchronous_grab_opencv.py [/h] [-h]')
    print()
    print('Parameters:')
    print('    camera_id   ID of the camera to use (using first camera if not specified)')
    print()


def abort(reason: str, return_code: int = 1, usage: bool = False):
    print(reason + '\n')

    if usage:
        print_usage()

    sys.exit(return_code)


def parse_args() -> Optional[str]:
    args = sys.argv[1:]
    argc = len(args)

    for arg in args:
        if arg in ('/h', '-h'):
            print_usage()
            sys.exit(0)

    if argc > 1:
        abort(reason="Invalid number of arguments. Abort.", return_code=2, usage=True)

    return None if argc == 0 else args[0]


def get_camera(camera_id: Optional[str]) -> Camera:
    with VmbSystem.get_instance() as vmb:
        if camera_id:
            try:
                return vmb.get_camera_by_id(camera_id)

            except VmbCameraError:
                abort('Failed to access Camera \'{}\'. Abort.'.format(camera_id))

        else:
            cams = vmb.get_all_cameras()
            if not cams:
                abort('No Cameras accessible. Abort.')

            return cams[0]


def setup_camera(cam: Camera):
    with cam:
        # Enable auto exposure time setting if camera supports it
        try:
            cam.ExposureAuto.set('Continuous')

        except (AttributeError, VmbFeatureError):
            pass

        # Enable white balancing if camera supports it
        try:
            cam.BalanceWhiteAuto.set('Continuous')

        except (AttributeError, VmbFeatureError):
            pass

        # Try to adjust GeV packet size. This Feature is only available for GigE - Cameras.
        try:
            stream = cam.get_streams()[0]
            stream.GVSPAdjustPacketSize.run()
            while not stream.GVSPAdjustPacketSize.is_done():
                pass

        except (AttributeError, VmbFeatureError):
            pass


def setup_pixel_format(cam: Camera):
    # Query available pixel formats. Prefer color formats over monochrome formats
    cam_formats = cam.get_pixel_formats()
    cam_color_formats = intersect_pixel_formats(cam_formats, COLOR_PIXEL_FORMATS)
    convertible_color_formats = tuple(f for f in cam_color_formats
                                      if opencv_display_format in f.get_convertible_formats())

    cam_mono_formats = intersect_pixel_formats(cam_formats, MONO_PIXEL_FORMATS)
    convertible_mono_formats = tuple(f for f in cam_mono_formats
                                     if opencv_display_format in f.get_convertible_formats())

    # if OpenCV compatible color format is supported directly, use that
    if opencv_display_format in cam_formats:
        cam.set_pixel_format(opencv_display_format)

    # else if existing color format can be converted to OpenCV format do that
    elif convertible_color_formats:
        cam.set_pixel_format(convertible_color_formats[0])

    # fall back to a mono format that can be converted
    elif convertible_mono_formats:
        cam.set_pixel_format(convertible_mono_formats[0])

    else:
        abort('Camera does not support an OpenCV compatible format. Abort.')


class Handler:
    def __init__(self, Video = None):
        self.ENTER_KEY_CODE = 13
        self.shutdown_event = threading.Event()
        if type(Video) != type(None):
            self.video = Video

    def __call__(self, cam: Camera, stream: Stream, frame: Frame):

        key = cv2.waitKey(1)
        if key == self.ENTER_KEY_CODE:
            self.shutdown_event.set()
            return

        elif frame.get_status() == FrameStatus.Complete:
            print('{} acquired {}'.format(cam, frame), flush=True)
            # Convert frame if it is not already the correct format
            if frame.get_pixel_format() == opencv_display_format:
                display = frame
            else:
                # This creates a copy of the frame. The original `frame` object can be requeued
                # safely while `display` is used
                display = frame.convert_pixel_format(opencv_display_format)
            # import ipdb;ipdb.set_trace()
            msg = 'Stream from \'{}\'. Press <Enter> to stop stream.'
            cv2.imshow(msg.format(cam.get_name()), display.as_opencv_image())
            if type(self.video) != type(None):
                self.video.write(display.as_opencv_image())

        cam.queue_frame(frame)


def main():
    print_preamble()
    cam_id = parse_args()

    settings_file='/home/abraham/Desktop/Vimba/Development/Settings/binned_correctColor_Grains.xml'
    videoPath = '/media/abraham/Courtside/Videos/'
    

    video_dir =  os.path.join(videoPath,str(date.today()))
    os.makedirs(video_dir, exist_ok=True)
    videoPath = os.path.join(video_dir, f'video_{int(time())}.mp4')



    with open(settings_file,"r+") as f:
        xml = f.read()
    settings = xmltodict.parse(xml)

    AquisitionSettings = settings['ModuleSettings']['CameraInfo']['RemoteDevice']['Feature']
    AquisitionDict = {i['@Name']:i['@Value'] for i in AquisitionSettings}

    size = (int(AquisitionDict['Width']), int(AquisitionDict['Height']))
    fps = float(AquisitionDict['AcquisitionFrameRate'])

    print(f'\n\n\t\tImage Size W:{size[0]}/H:{size[1]} \n\n\t\tFPS:{fps}')

    video = cv2.VideoWriter( videoPath, cv2.VideoWriter_fourcc(*'mp4v'), fps, size)
    # import ipdb;ipdb.set_trace()

    with VmbSystem.get_instance():
        with get_camera(cam_id) as cam:
            # setup general camera settings and the pixel format in which frames are recorded
            setup_camera(cam)
            setup_pixel_format(cam)
            cam.load_settings(settings_file, PersistType.All)
            handler = Handler(Video=video)

            try:
                # Start Streaming with a custom a buffer of 10 Frames (defaults to 5)
                cam.start_streaming(handler=handler, buffer_count=10)
                handler.shutdown_event.wait()

            finally:
                cam.stop_streaming()
                handler.video.release()


if __name__ == '__main__':
    main()
