import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreateLearningPathPayload {
  subject: string;
  startingLevel?: string;
}

interface LearningPath {
  id: string;
  user_id: string;
  subject: string;
  title: string;
  starting_level: string | null;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private apiUrl = 'http://localhost:3000/learning-paths';

  constructor(private http: HttpClient) {}

  create(payload: CreateLearningPathPayload): Observable<LearningPath> {
    return this.http.post<LearningPath>(this.apiUrl, payload);
  }
}
