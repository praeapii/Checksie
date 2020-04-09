# Checksie Docker

### Install a Docker

To install docker follow this [tutorial](https://docs.docker.com/engine/install/)



### Build a Docker container

to build a docker container from the docker file run

```
$ sudo docker build -t [imagename]:[image version] .
```

example:  `$ sudo docker build -t covid:dev .`

more [options](https://docs.docker.com/engine/reference/commandline/build/) for docker build



or using the script

```
$ sudo bash build.sh
```



### Run a Docker container

to run a docker container 

```
$ sudo docker run -it [imagename]:[imageversion]
```

example:  `$ sudo docker run -it covid:dev .`

more [options](https://docs.docker.com/engine/reference/commandline/run/) for docker run



or using the script

```
$sudo bash run.sh
```

