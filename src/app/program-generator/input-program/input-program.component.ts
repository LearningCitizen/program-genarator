import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-program',
  templateUrl: './input-program.component.html',
  styleUrls: ['./input-program.component.sass'],
})
export class InputProgramComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group(
      {
        rangeDate: this.fb.group({
          start: ['', Validators.required],
          end: ['', Validators.required],
        }),
      },
      {
        validators: [],
        updateOn: 'blur',
      }
    );
  }
}
