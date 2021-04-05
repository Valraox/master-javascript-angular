import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService],
})
export class ArticleNewComponent implements OnInit {
  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;

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
    this.is_edit = false;
    this.page_title = 'Crear artículo';
  }

  ngOnInit(): void {}

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          // Alerta
          Swal.fire(
            'Artículo creado',
            'El artículo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data) {
    if (data.body.status == 'success') {
      this.article.image = data.body.image;
    }
  }
}
