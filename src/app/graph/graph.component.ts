import {Component, Output, EventEmitter,AfterViewInit, ViewChild } from "@angular/core";
import { MessageService } from '../message.service';
import {NgCyto} from '../ng-cyto/ng-cyto.directive'

@Component({
    selector: 'cy-graph',
    templateUrl: './graph.component.html',
    styles: [`
      ng2-cytoscape {
        height: 100vh;
        height: 70vh;
        float: left;
        width: 100%;
        position: relative;
    }`],
})

export class GraphComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        
    }
    @ViewChild(NgCyto)
    private graph : NgCyto;
    private log(message: string) {
        this.messageService.add('GraphComponent: ' + message);
      }

    onShowNewGraph(elements) {
        this.log("onShowNewGraph");
        this.graphData = null;
        this.graphData = elements;        
        //this.graph.onShowNewGraph(elements);
    }

    public changeNodeColor(nodeId,nodeColor) {
        this.graph.changeNodeColor(nodeId,nodeColor);
    }

    public changeEdgeColor(edgeId,edgeColor) {
        this.graph.changeEdgeColor(edgeId,edgeColor);
    }

    node_name: string;

    layout = {
                //name: 'dagre',
                name: 'circle',
                //rows: 1
                //rankDir: 'LR',
                //directed: true,
                //padding: 0
            };

   graphData = {
            nodes: [
                { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
                { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
                { data: { id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
                { data: { id: 'd', name: 'Sales', weight: 100,  colorCode: 'blue', shapeType: 'roundrectangle'} },
                { data: { id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
                { data: { id: 'f', name: 'Loan', parent:'d',weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
                { data: { id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse' } },
                { data: { id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse' } }
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
    };

    constructor(public messageService: MessageService) {
    }

    

    nodeChange(event) {
        this.node_name = event;
    }

}