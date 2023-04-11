import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { ViewResultComponent } from './pages/admin/view-result/view-result.component';
import { ViewUserDetailsComponent } from './pages/admin/view-user-details/view-user-details.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FeedbackComponent } from './pages/user/feedback/feedback.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizAttemptsComponent } from './pages/user/quiz-attempts/quiz-attempts.component';
import { StartComponent } from './pages/user/start/start.component';
import { UpdateUserProfileComponent } from './pages/user/update-user-profile/update-user-profile.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'reset-password/:link',
    component: ResetPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'help',
    component: HelpcenterComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],

    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
      },
      {
        path: 'update-category/:cid',
        component: UpdateCategoryComponent,
      },
      {
        path: 'view-result',
        component: ViewResultComponent,
      },
      {
        path: 'view-user-details/:id',
        component: ViewUserDetailsComponent,
      },
      {
        path: 'ranking/:qid',
        component: RankingComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: ':catid',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,
      },
      {
        path: 'view/profile',
        component: UserProfileComponent,
      },
      {
        path: 'update/profile',
        component: UpdateUserProfileComponent,
      },
      {
        path: 'result/quiz-attempts/:id',
        component: QuizAttemptsComponent,
      },
      {
        path: 'feedback/help',
        component: FeedbackComponent,
      },
    ],
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
