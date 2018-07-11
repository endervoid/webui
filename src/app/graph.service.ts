import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Params } from './params';
@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private heroesUrl = 'http://node159550-env-7559099.jelastic.dogado.eu:11022/getGraphTypeList';
  private serverUrl = 'http://localhost:8090';
  //private serverUrl = 'https://node159550-env-7559099.jelastic.dogado.eu:11022';

  
  getGraphTypes():Observable<string[]> {
    
    return this.http.get<string[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError('getGraphTypes', []))
      
    );
    
    //var ret: string[] = ["1","2"];
    //return of(ret);    
  }

  private log(message: string) {
    this.messageService.add('GraphService: ' + message);
  }
  
  generateGraph(params_:Params ):Observable<string[]> {
    /*var params: HttpParams;
    params = new HttpParams();
    params.set('nOfVertices','10');
    params.set('maxDegree','5');
    params.set('graphType','SimpleUndirectedGraph');
    const options = {params};*/

    const options =  { params: new HttpParams().set('graphType', params_.graphType).set('nOfVertices',params_.nOfVertices.toString()).set('maxDegree',params_.maxDegree.toString()) };
  debugger;/* let elements = {
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

  var url = this.serverUrl.concat("/genGraph");
    let ret = this.http.get<string[]>(url,options)
    .pipe(
      catchError(this.handleError('genGraph', []))
      
    );
    return ret;
  }

  runHeuristic(params_:Params ):Observable<string[]> {
    /*var params: HttpParams;
    params = new HttpParams();
    params.set('nOfVertices','10');
    params.set('maxDegree','5');
    params.set('graphType','SimpleUndirectedGraph');
    const options = {params};*/

    const options =  { params: new HttpParams().set('name', params_.heuristic) };
  
  var url = this.serverUrl.concat("/runHeuristic");
    let ret = this.http.get<string[]>(url,options)
    .pipe(
      catchError(this.handleError('runHeuristic', []))
      
    );
    return ret;
  }

  getValidHeuristics(graphType:string):Observable<string[]> {
    var url = this.serverUrl.concat("/getHeuristicList");
    return this.http.get<string[]>(url)
    .pipe(
      catchError(this.handleError('getHeuristicList', []))
      
    );
    
  }

  getBFS():Observable<string[]> {
    var url = this.serverUrl.concat("/bfs");
    return this.http.get<string[]>(url)
    .pipe(
      catchError(this.handleError('getHeuristicList', []))
      
    );
    
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  constructor( private http: HttpClient,
    private messageService: MessageService) { }
}
