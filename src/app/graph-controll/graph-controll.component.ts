import { Component, OnInit,EventEmitter,Output,AfterViewInit, ViewChild   } from '@angular/core';
import { Params } from '../params';
import { GraphService } from '../graph.service';
import { MessageService } from '../message.service';
import {GraphComponent} from '../graph/graph.component';

@Component({
  selector: 'app-graph-controll',
  templateUrl: './graph-controll.component.html',
  styleUrls: ['./graph-controll.component.css']
})
export class GraphControllComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    
  }
  @ViewChild(GraphComponent)
  private graphComponent: GraphComponent;

  @Output() showNewGraph= new EventEmitter<boolean>();

  params : Params = {
    maxDegree : 3,
    nOfVertices:5,
    graphType:"",
    heuristic:"",   
  }  

  private log(message: string) {
    this.messageService.add('GraphControllComponent: ' + message);
  }

  graphTypes : string[];
  elements:string[];
  heuristics:string[];
  bfs:number[];
  currentBFS=0;
  validBFS=false;
  validBFSNext=false;
  currentBFSColor='green';
  nodeColors :string[]=[];

  constructor(private graphService:GraphService,public messageService: MessageService) { }

  changeBFS(bfs) {
    this.bfs = bfs;   
    this.currentBFS=0;
    this.validBFSNext=true;  
    if (this.currentBFSColor == 'green') {
      this.currentBFSColor='black';
    }else {
      this.currentBFSColor='green';
    }
    this.validBFS=false;
  }

  graphTypeChange() {
    this.log("type changed");
  }

  test(heuristic) {
    
    this.heuristics = heuristic;
    
  }

  getGraphTypes():void {
    this.graphService.getGraphTypes()
      .subscribe(graphTypes => {this.graphTypes = graphTypes,this.params.graphType = this.graphTypes[0]});
  
    
  }

  getHeuristics():void {
    this.graphService.getValidHeuristics("")
      .subscribe(heuristics => {this.heuristics = heuristics,this.params.heuristic = this.heuristics[0],this.test(heuristics)});
      
    

  }

  getRandomColor() :string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

public colorNode(t:string):string {
    var index:number;
    index = parseInt(t);
    //debugger;
    if (this.nodeColors[index]==null || this.nodeColors[index]=="-1") {            
        var abort=false;
        var color;
        while(!abort) {
            abort=true;
            color = this.getRandomColor();
            for (var i=0;i<this.nodeColors.length;i++) {
                if(this.nodeColors[i]==color) {
                    abort=false;
                    break;
                }
            }
        }
        if (index+1 > this.nodeColors.length) {
          while(index+1>this.nodeColors.length) {
          this.nodeColors.push("-1");
          }
        }
        this.nodeColors[index]=color;
              
        return color;

    }
    return this.nodeColors[index];
    
}

  ngOnInit() {
    this.getGraphTypes();
  }

  elementsChanged2(elements) {    
    this.getHeuristics();
    this.elementsChanged(elements);
   
  }

  elementsChanged(elements) {    
  
    this.nodeColors= null;
    this.nodeColors=[];

    for (var i=0;i<elements.nodes.length;i++) {
      var color = this.colorNode(elements.nodes[i].data.colorCode);
      //elements.nodes[i].data.color=color;
      elements.nodes[i].data.colorCode=color;              
      //elements.nodes[i].data.colorCode='white';
    }

    for (var i=0;i<elements.edges.length;i++) {
      var color = this.colorNode(elements.edges[i].data.colorCode);
      //elements.nodes[i].data.color=color;
      elements.edges[i].data.colorCode=color;              
      //elements.nodes[i].data.colorCode='white';
    }
        
    
      this.graphComponent.onShowNewGraph(elements);     
     this.validBFS=true;
     this.validBFSNext=false;
  }

  onBFSNext() {
    
    if (this.currentBFS < this.bfs.length) {
    
    
    }else{
      if (this.currentBFSColor == 'green') {
        this.currentBFSColor='black';
      }else {
        this.currentBFSColor='green';
      }
      this.currentBFS=0;

    }
    
    var id:string;    
  id = '#'.concat(this.bfs[this.currentBFS].toString());
  this.graphComponent.changeNodeColor(id,this.currentBFSColor)
  this.currentBFS++;
    
  }

  onBFS() {
    this.graphService.getBFS()
.subscribe(bfs => this.changeBFS(bfs)); 


  }

  onGenerate() {
    this.log("graph generated");
    
   /* let elements = {
      nodes: [
          { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
          { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },

      ],
      edges: [
          { data: { source: 'a', target: 'b', colorCode: 'blue', strength: 10 } },
          { data: { source: 'b', target: 'c', colorCode: 'blue', strength: 10 } },
          { data: { source: 'c', target: 'd', colorCode: 'blue', strength: 10 } },
          { data: { source: 'c', target: 'e', colorCode: 'blue', strength: 10 } },
          { data: { source: 'c', target: 'f', colorCode: 'blue', strength: 10 } },
          { data: { source: 'e', target: 'j', colorCode: 'red', strength: 10 } },
          { data: { source: 'e', target: 'k', colorCode: 'green', strength: 10 } }
      ]      
    };*/

    let elements = {
      nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },

      ],
      edges: [
          { data: { id: 'a',source: 'a', target: 'b' } },
      ]      
    };

    //this.elementsChanged(elements);

this.graphService.generateGraph(this.params)
.subscribe(elements => this.elementsChanged2(elements));  

  
    
  
  }

  onRunHeuristic() {
    this.log("graph generated");
    
   
    //this.elementsChanged(elements);
    
this.graphService.runHeuristic(this.params)
.subscribe(elements => this.elementsChanged(elements));  
  
  
    
  
  }

  onClick() {
    
  }

}
