import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EntryComponent } from "./entry/entry.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: "", redirectTo: "/entry", pathMatch: "full" },
    {
        path: 'home',
        loadChildren: () => import('~/app/home/home.module').then(m => m.HomeModule)
      },
    { path: "entry", component: EntryComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
