FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y make
# ADD https://ccb.jhu.edu/software/glimmer/glimmer302b.tar.gz /
ADD glimmer302b.tar.gz /
WORKDIR /glimmer3.02/src
RUN make
