import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RootObject} from '../notepad/note';

@Injectable({
  providedIn: 'root'
})
export class NotepadService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNotes(): Observable<RootObject[]>{
    return this.http.get<RootObject[]>(`${this.apiServerUrl}/notes`);
  }

  public addNote(rootObject: RootObject): Observable<RootObject>{
    return this.http.post<RootObject>(`${this.apiServerUrl}/notes`, rootObject);
  }

  public editNoteById(noteId: number, rootObject: RootObject): Observable<RootObject> {
    return this.http.put<RootObject>(`${this.apiServerUrl}/notes/${noteId}`, rootObject);
  }

  public deleteNoteById(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notes/${noteId}`);
  }

}
