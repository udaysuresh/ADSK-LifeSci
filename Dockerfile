FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y make
ADD glimmer302b.tar.gz /
#todo - should download the tar.gz and unzip here
# tar -xzvf glimmer302b.tar.gz

COPY glimmer3.02/ /testdir
WORKDIR /testdir/src
RUN make
WORKDIR /

#VOLUME ["/testdir"]

#todo
RUN mkdir /test
VOLUME ["/test"]
#ADD $PWD/test /test

#CMD ["/testdir/bin/glimmer3"]
#RUN ["chmod", "+x", "/testdir/bin/glimmer3"]

#to run
#docker run -ti glimmer /testdir/sample-run/tpall.fna /testdir/sample-run/from-scratch.icm /test/help
