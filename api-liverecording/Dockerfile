# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Atualize o sistema e instale as dependências
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    build-essential \
    cmake \
    libusb-1.0-0-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    sudo

# Copy VimbaX_Setup-2023-1-Linux64.tar.gz to /tmp/
COPY ./api-liverecording/VimbaX_Setup-2023-1-Linux64.tar.gz /tmp/

# Extract VimbaX_Setup-2023-1-Linux64.tar.gz and run installation scripts
RUN tar -xzvf /tmp/VimbaX_Setup-2023-1-Linux64.tar.gz -C /tmp/ && \
    chmod +x /tmp/VimbaX_2023-1/cti/VimbaUSBTL_Install.sh && \
    sudo /tmp/VimbaX_2023-1/cti/VimbaUSBTL_Install.sh && \
    chmod +x /tmp/VimbaX_2023-1/cti/VimbaGigETL_Install.sh && \
    sudo /tmp/VimbaX_2023-1/cti/VimbaGigETL_Install.sh && \
    rm -rf /tmp/VimbaX_Setup-2023-1-Linux64 /tmp/VimbaX_Setup-2023-1-Linux64.tar.gz

# Install Python dependencies
RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r ./api-liverecording/requirements.txt

# Install vmbpy from the extracted file
RUN pip3 install --no-cache-dir /tmp/VimbaX_2023-1/api/python/vmbpy-1.0.2-py3-none-any.whl

EXPOSE 5000

# Run the command when the container launches
CMD ["python", "VideoGrab.py"]