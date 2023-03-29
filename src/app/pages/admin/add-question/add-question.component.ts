import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor: any = ClassicEditor;
  qid: any;
  title: any;
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.title = this._route.snapshot.params['title'];
    // console.log(this.qid);
    this.question.quiz['qid'] = this.qid;
    this.question.quiz['title'] = this.title;
  }

  formSubmit() {
    if (
      this.question.content.trim() == '' ||
      this.question.content.trim() == null ||
      this.question.option1.trim() == '' ||
      this.question.option1.trim() == null ||
      this.question.option2.trim() == '' ||
      this.question.option2.trim() == null ||
      this.question.option3.trim() == '' ||
      this.question.option3.trim() == null ||
      this.question.option4.trim() == '' ||
      this.question.option4.trim() == null ||
      this.question.answer.trim() == '' ||
      this.question.answer.trim() == null
    ) {
      this._snack.open('All fields are required !!', '', { duration: 3000 });
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);

        Swal.fire('Success', 'Question added successfully', 'success').then(
          (e) => {
            window.location.reload();
          }
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'something went wrong !!', 'error');
      }
    );
  }
}
