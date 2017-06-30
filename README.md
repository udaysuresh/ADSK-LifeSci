# docker-ADSK
enjoying life, pastries, Dockerfiles, etc. 


# Instructions for getting data in/out


	docker build -t glimmer .

	docker run -ti -v $PWD/mydata:/test -w /test glimmer /glimmer3.02/bin/long-orfs tpall.fna -n -t 1.15 TEST
	
	docker run -ti -v $PWD/mydata:/test -w /test glimmer /glimmer3.02/bin/glimmer3 /glimmer3.02/sample-run/tpall.fna /glimmer3.02/sample-run/from-scratch.icm TEST

Note that the `TEST` file now resides in ./mydata

