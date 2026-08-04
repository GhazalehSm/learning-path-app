import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LearningPathService } from '../learning-paths/service/learning-path.service';

@Component({
  selector: 'app-start-learning',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './start-learning.html',
  styleUrl: './start-learning.scss',
})
export class StartLearning {
  loading = false;
  errorMessage = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private learningPathService: LearningPathService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      subject: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const subject = this.form.value.subject;

    this.learningPathService
      .create({
        subject,
        title: `Learn ${subject}`,
      })
      .subscribe({
        next: (path) => {
          this.loading = false;
          this.router.navigate(['/paths', path.id]);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        },
      });
  }
}
