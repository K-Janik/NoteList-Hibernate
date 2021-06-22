import { Component, OnInit } from '@angular/core';
import {RootObject} from './note';
import {NotepadService} from '../services/notepad.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent implements OnInit {

  public editNote: RootObject;
  public deleteNote: RootObject;
  public rootObject: RootObject[];

  constructor(private notepadService: NotepadService) { }

  ngOnInit(): void {
    this.getNote();
  }

  public getNote(): void{
    this.notepadService.getNotes().subscribe(
      (response: RootObject[]) => {
        this.rootObject = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public addNote(addForm: NgForm): void {
    document.getElementById('add-note-form').click();
    this.notepadService.addNote(addForm.value).subscribe(
      (response: RootObject) => {
        console.log(response);
        this.getNote();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateNoteById(id: number, note: RootObject): void {
    this.notepadService.editNoteById(id, note).subscribe(
      (response: RootObject) => {
        console.log(response);
        this.getNote();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteNoteById(noteId: number): void {
    this.notepadService.deleteNoteById(noteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNote();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(rootObject: RootObject, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNoteModal');
    }
    if (mode === 'delete') {
      this.deleteNote = rootObject;
      button.setAttribute('data-target', '#deleteNoteModal');
    }
    if (mode === 'edit') {
      this.editNote = rootObject;
      button.setAttribute('data-target', '#updateNoteModal');
    }
    container.appendChild(button);
    button.click();
  }

}
