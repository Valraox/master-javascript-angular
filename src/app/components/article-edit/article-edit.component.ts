import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: Global.url + 'upload-image/',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el artículo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Límite',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar artículo';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.articleUpdated;

          // Alerta
          Swal.fire(
            'Artículo editado',
            'El artículo se ha editado correctamente',
            'success'
          );

          this._router.navigate(['/blog/articulo/', this.article._id]);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error);
        this.status = 'error';
        // Alerta
        Swal.fire(
          'Edición fallida',
          'El artículo no se ha editado correctamente',
          'error'
        );
      }
    );
  }

  imageUpload(data) {
    if (data.body.status == 'success') {
      this.article.image = data.body.image;
    }
  }

  getArticle() {
    this._route.params.subscribe((params) => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        (error) => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }
}
