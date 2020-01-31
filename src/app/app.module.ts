import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { BuilderModule } from './builder/builder.module';
import { HighchartsModule } from './highcharts/highcharts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,

    // features
    DashboardModule,
    UsersModule,
    BuilderModule,
    HighchartsModule,

    // app
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
