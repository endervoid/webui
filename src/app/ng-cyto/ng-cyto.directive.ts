import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { MessageService } from '../message.service';
import { isListLikeIterable } from '../../../node_modules/@angular/core/src/change_detection/change_detection_util';

declare var cytoscape: any;

@Component({
    selector: 'ng2-cytoscape',
    template: '<div id="cy"></div>',
    styles: [`#cy {
        height: 500px;
        width: 100%;
        position: absolute;
        left: 20;
        top: 20;
        background-color: lightblue;              
    }`]
})


export class NgCyto implements OnChanges {
    

    @Input() public elements: any;
    @Input() public style: any;
    @Input() public layout: any;
    @Input() public zoom: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    private cy;
 
    edgeColors :string[]=[];    

    private log(message: string) {
        this.messageService.add('GraphDirective: ' + message);
      }
    
    public onShowNewGraph(elements) {        
        this.edgeColors=[];
        this.log("onShowNewGraph");
        
        //this.cy.destroy();
        this.elements = elements;       
        
        //this.render();
        

        
    }

   

  /*  public colorEdge(t:string):string {
        var index:number;
        index = parseInt(t);
        if (this.edgeColors[index]==null) {            
            var abort=false;
            var color;
            while(!abort) {
                abort=true;
                color = this.getRandomColor();
                for (var i=0;i<this.edgeColors.length;i++) {
                    if(this.edgeColors[i]==color) {
                        abort=false;
                        break;
                    }
                }
            }
            this.edgeColors[index]==color;            
            return color;

        }
        return 'white';
        
    }*/

    public changeNodeColor(edgeId,edgeColor) {
        this.cy.nodes(edgeId).style({
            'background-color': edgeColor
          });
                
    }

    public changeEdgeColor(edgeId,edgeColor) {
        this.cy.edges(edgeId).style({
            'background-color': edgeColor,
            'line-color':edgeColor
          });
                
    }

    public constructor(private renderer : Renderer, private el: ElementRef,public messageService: MessageService) {

        this.layout = this.layout || {
                name: 'circle',
                directed: true,
                padding: 0
            };

        this.zoom = this.zoom || {
                min: 0.1,
                max: 1.5
            };
            
        this.style = this.style || cytoscape.stylesheet()
               
            .selector('node')
            .css({
                //'background-color': this.test('#000000'),
                'background-color': 'data(colorCode)',
                //'background-color': 'white',
                'color':'black',
                'content': 'data(id)',
                'shapeType': 'roundrectangle',
                /*'background-color': 'data(colorCode)',*/
                /*'shape': 'data(shapeType)',
                'width': 'mapData(weight, 40, 80, 20, 60)',
                'content': 'data(name)',
                'text-valign': 'center',
                'text-outline-width': 1,
                'text-outline-color': 'data(colorCode)',
                'background-color': 'data(colorCode)',
                'color': '#fff',
                'font-size': 10*/
            })
            .selector(':selected')
            .css({
                'border-width': 1,
                'border-color': 'black'
            })
            .selector('edge')
            .css({
                'width': 0.7,
                'line-color': 'data(colorCode)',
                //'line-color': 'black',
                'content':'data(label)',
                //'curve-style': 'bezier',
                //'opacity': 0.666,
                //'width': 'mapData(strength, 70, 100, 2, 6)',
                //'target-arrow-shape': 'triangle',
                //'line-color': 'data(colorCode)',
                //'source-arrow-color': 'data(colorCode)',
                //'target-arrow-color': 'data(colorCode)'
            })
            .selector(':parent')
            .css({
                'background-opacity': 0.333
            })
            
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            });
            
    }

    public ngOnChanges(): any {
        this.render();
        console.log(this.el.nativeElement);
    }

    public render() {
    
      let cy_contianer = this.renderer.selectRootElement("#cy");
      let localselect = this.select;
      
      this.cy = cytoscape({
            container : cy_contianer, 
            layout: this.layout,
            minZoom: this.zoom.min,
            maxZoom: this.zoom.max,
            style: this.style,
            elements: this.elements,
            wheelSensitivity:0.3,
            styleEnabled: true,
        });


     this.cy.on('tap', 'node', function(e) {
            var node = e.cyTarget;
            var neighborhood = node.neighborhood().add(node);

            this.cy.elements().addClass('faded');
            neighborhood.removeClass('faded');
            localselect.emit(node.data("name"));
        });

        this.cy.on('tap', function(e) {
                if (e.cyTarget === this.cy) {
                    this.cy.elements().removeClass('faded');
                }
        });
    }

}
