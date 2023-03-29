import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';

import { SidebarComponent as UserSidebar } from './pages/user/sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { MatTableModule } from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { MatDividerModule } from '@angular/material/divider';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './pages/user/update-user-profile/update-user-profile.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { QuizAttemptsComponent } from './pages/user/quiz-attempts/quiz-attempts.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgVarDirective } from './directive/ng-var.directive';
import { FeedbackComponent } from './pages/user/feedback/feedback.component';
import { ViewResultComponent } from './pages/admin/view-result/view-result.component';
import { ImageService } from './services/image.service';
import { ViewUserDetailsComponent } from './pages/admin/view-user-details/view-user-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewLoginComponent } from './pages/new-login/new-login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RankingComponent } from './pages/ranking/ranking.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';


// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,

    UserSidebar,

    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,

    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    LoadQuizComponent,
    InstructionsComponent,
    StartComponent,
    UserProfileComponent,
    UpdateUserProfileComponent,
    ViewUsersComponent,
    UpdateCategoryComponent,
    QuizAttemptsComponent,
    NgVarDirective,
    FeedbackComponent,
    ViewResultComponent,
    ViewUserDetailsComponent,
    NewLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RankingComponent,
    HelpcenterComponent,
  ],
  imports: [
    MatButtonToggleModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatListModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAlert,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    MatProgressBarModule,
    MatDialogModule,
    

    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    MatNativeDateModule,
  ],
  providers: [authInterceptorProviders, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
