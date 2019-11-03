FROM ubuntu:latest

RUN apt-get update; apt-get install -y curl python3 python3-pip wget libboost-python-dev libboost-dev build-essential zlib1g-dev libboost-system-dev libboost-program-options-dev

RUN apt-get update && apt-get install -y \
  xz-utils \
  build-essential \
  curl \
  && rm -rf /var/lib/apt/lists/* \
  && curl -SL http://releases.llvm.org/9.0.0/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz \
  | tar -xJC . && \
  mv clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04 clang_9.0.0 && \
  echo 'export PATH=/clang_9.0.0/bin:$PATH' >> ~/.bashrc && \
  echo 'export LD_LIBRARY_PATH=/clang_9.0.0/lib:$LD_LIBRARY_PATH' >> ~/.bashrc

CMD [ "/bin/bash" ]
