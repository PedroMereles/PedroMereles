import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate :[AuthGuard]
  },
  {
    path: 'folder/Inbox',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate :[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate :[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-clave',
    loadChildren: () => import('./recuperar-clave/recuperar-clave.module').then( m => m.RecuperarClavePageModule)
  },
  {
    path: 'precios',
    loadChildren: () => import('./precios/precios.module').then( m => m.PreciosPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservar',
    loadChildren: () => import('./reservar/reservar.module').then( m => m.ReservarPageModule)
  },
  {
    path: 'editar/perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'comentario',
    loadChildren: () => import('./comentario/comentario.module').then( m => m.ComentarioPageModule)
  },
  {
    path: 'coment',
    loadChildren: () => import('./coment/coment.module').then( m => m.ComentPageModule)
  },
  {
    path: 'grupo',
    loadChildren: () => import('./grupo/grupo.module').then( m => m.GrupoPageModule)
  },
  {
    path: 'agregar-comentario',
    loadChildren: () => import('./agregar-comentario/agregar-comentario.module').then( m => m.AgregarComentarioPageModule)
  },
  {
    path: 'agregar-servicio',
    loadChildren: () => import('./agregar-servicio/agregar-servicio.module').then( m => m.AgregarServicioPageModule)
  },
  {
    path: 'lista-servicios',
    loadChildren: () => import('./lista-servicios/lista-servicios.module').then( m => m.ListaServiciosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
