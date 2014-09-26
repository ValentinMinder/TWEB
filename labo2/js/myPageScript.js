var jsvis = {
  VisualizationGraph : function() {
    var jsGraph = new Graph();

    this.addJsObjectToGraph = function(obj) {
      jsGraph.addVertexFromJs(obj);
    }
    this.draw = function(contentTarget, confPhysMode) {
      var eList = jsGraph.edgesList();
      var physMode = (confPhysMode)?true:false;

      var data = {
        nodes: jsGraph.vertexes,
        edges: eList
      };

      var options = {
        configurePhysics: physMode,
        nodes: {
          shape: 'box'
        }
      };

      network = new vis.Network(contentTarget, data, options);
      network.selectNodes([0]);
    }
  }
};