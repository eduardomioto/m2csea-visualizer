M2CSEA - Visualizer Module
--------------
[![Build Status](https://travis-ci.org/eduardomioto/mc2pd-visualizer.svg?branch=master)](https://travis-ci.org/eduardomioto/mc2pd-visualizer)

##### Introduction
Technologies Involved 

| Framework       | Description                                                   | 
| ----------------|:--------------------------------------------------------------| 
| Consul          | Service Discovery                                             |
| Docker          | Containerization                                              |  
| Sample Apps     | Spring Boot + Spring Cloud + Actuator + Rest Template + SLF4J |  
| Neo4J           | Graph based visualization)                                    |  
| D3 or other     | Advanced Visualization                                        |  
| Sleuth + Zipkin | Distributed Tracing Solution                                  |  

##### Phases
------------

[Pivotal Tracker - Project Planning](https://www.pivotaltracker.com/n/projects/2036523) 

| Phase           | Objective                                                          |  Status  | 
| ----------------|:-------------------------------------------------------------------|----------|
| Phase 1         | Demonstrate Key Nodes on a microservice simplified infrastructure  | Done     |
| Phase 2         | View Key Nodes Plotted                                             | Planned  |
| Phase 3         | Estabilish the Visualizer                                          | Planned  |
| Phase 4         | 3D Visualization                                                   | Planned  |

##### Installing
------------
* 
```
### Python and PIP
sudo apt-get install python-pip python-dev build-essential 

### Docker
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
sudo apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo systemctl status docker

### Docker Compose
sudo pip install docker-compose

### Java
sudo cp -r jdk-8u20-linux-x64.tar.gz /usr/local/java/
cd /usr/local/java
sudo tar xvzf jdk-8u20-linux-x64.tar.gz
export JAVA_HOME=/usr/local/java/jdk1.8.0_20
export PATH=$JAVA_HOME/bin:$PATH

### Maven
sudo apt-get install maven
mvn -version
```

##### Running
------------
```
cd microservice-critical-path/containers/compose
sudo ./docker-compose.sh
```

##### Accessing
------------

| Service         | URL                                      |
| ----------------|:-----------------------------------------|
| Consul          | http://localhost:8500/ui/#/dc1/services  | 
| Neo4J           | http://localhost:7474/browser/           | 
| Zipkin          | http://localhost:9411/zipkin/            |                 
| Finder          | http://localhost:9090/zipkin/            |                  

##### Next Steps
------------
- Criticidade por número de conexões incoming e outgoing
- Criticidade por número de interfaces providas (Pode ser uado direto do Finder verificando o Actuator [http://www.baeldung.com/spring-boot-actuators])
- Criticidade por consumo de recursos computacionais e proximidade com ponto de falha
- Criticidade considerando os 3 itens acima em conjunto
- Criticidade por input manual do usuario


##### References
------------
- [1] [Docker Docs](https://docs.docker.com/compose/reference/scale/)
- [2] [Consul Getting Started](https://www.consul.io/intro/getting-started/install.html)

##### Issues
------------
- Fix Dynamic Mapping on Nginx from Finder-View to locate Finder project
- Fix Dynamic Mapping on NodeJS projects to locate Consul
  

##### Pending

- Fazer o calculo de criticidade e retornar no JSON
- Fazer a listagem de Incoming e Outgoing e colocar no JSON
- Posicionar os grafos de modo mais visualmente agradavel
- Ajustar as interfaces para @Delete, @Post, @Put, @Get
- Pensar em disponibilizar o Swagger do finder ([http://www.baeldung.com/swagger-2-documentation-for-spring-rest-api])

##### Reference
- http://www.baeldung.com/building-a-restful-web-service-with-spring-and-java-based-configuration

###### Visualizer
---------

* Graph 'Ready' Libs: 


####### Pending:
---------

- Mudar a cor das aretas quando são Incoming (vermelha) e Outgoing (verde)
- Plotar os grafos sem sobreposição (Almost Done)
- overlap >> https://github.com/alexandersimoes/d3plus/wiki/Visualizations#nodes-array--url--object--callback-
- Colocar no tooltip (onclick) as informações de Incoming, Outgoing e calculo de criticidade
- https://github.com/alexandersimoes/d3plus/wiki/Visualizations#tooltip-array--object-
- Coloca o texto legível mesmo considerando o graos no tamanho atual

####### References:
---------
- [1] https://github.com/alexandersimoes/d3plus/wiki/Network-Utilities
- [2] https://bost.ocks.org/mike/miserables/
- [3] http://mbostock.github.io/d3/talk/20111116/bundle.html
- [4] http://sigmajs.org/
- [5] https://blog.sicara.com/compare-best-javascript-chart-libraries-2017-89fbe8cb112d
- [6] http://antenna.io/demo/jquery-bar-rating/examples/
- [7] https://github.com/antennaio/jquery-bar-rating/tree/master/dist/themes
- [8] https://www.packtpub.com/books/content/responsive-visualizations-using-d3js-and-bootstrap
- [9] https://i.pinimg.com/originals/6b/fb/c2/6bfbc2fcb5bda823f583688c185b2589.png
- [10] https://themes.getbootstrap.com/products/dashboard

####### Credits:
---------
- [1] Image: https://www.flaticon.com/free-icon/line-chart_263094#term=graph&page=1&position=8
- [2] Image: https://thenounproject.com/term/free/56321/
- [3] Image: https://thenounproject.com/search/?q=user&i=1017085
- [4] Image: https://thenounproject.com/search/?q=all&i=992687
