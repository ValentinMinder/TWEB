function Edge(from, to, type) {
    this.from = from;
    this.to = to;
    switch(type) {
        case "inherit":
            this.style = "arrow-center"
            this.arrowScaleFactor = 1;
            this.color = {"color":"red",
                          "highlight": "red"}
            break;
        case "property":
            this.color = {"color":"green",
                          "highlight": "green"}
            break;
    }
}

function Vertex(id, label, type, source) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.source = source;
    this.edges = [];
    this.addEdge = function(to, type) {
        this.edges[this.edges.length] = new Edge(this.id, to, type);
    }
}

function Graph() {
    
    this.vertexes = [];

    this.addVertexFromJs = function(jsObject) {
        var last = null;
        var alreadyExist = null;
        var current = jsObject;
        
        while(current != null) {

            var existingVertex = false;
            var ver = null;

            for(var i in this.vertexes) {
                if(this.vertexes[i].source == current) {
                    ver = this.vertexes[i];
                    existingVertex = true;
                    break;
                }
            }

            if(ver == null) {
                ver = new Vertex(
                    this.vertexes.length,
                    current.constructor.name,
                    "Object",
                    current
                );

                var index = this.addVertex(ver);
            }
            
            if(last != null && !existingVertex) {
                this.vertexes[last].addEdge(index, "inherit");
            }
            else if(existingVertex) {
                this.vertexes[last].addEdge(ver.id, "inherit");
                break;
            }

            for (var key in current) {
                var obj = current[key];
                if(obj != null) {
                    var sVer = new Vertex(
                        this.vertexes.length,
                        key + ": " + obj,
                        "Property",
                        null
                    );

                    sVer.color = {};
                    sVer.color.border = "green";

                    if(current.hasOwnProperty(key)) sVer.color.background = "yellow";
                    else sVer.color.background = "gray";

                    ver.addEdge(sVer.id, "property");
                    this.addVertex(sVer);
                }
            }

            last = index;
            current = Object.getPrototypeOf(current);
        }
    }

    this.addVertex = function(val) {
        var index = this.vertexes.length;
        this.vertexes[index] = val;
        return index;
    }

    this.edgesList = function() {
        var edges = [];

        for(iV in this.vertexes) {
            for(iE in this.vertexes[iV].edges) {
                edges[edges.length] = this.vertexes[iV].edges[iE];
            }
        }

        return edges;
    }
}