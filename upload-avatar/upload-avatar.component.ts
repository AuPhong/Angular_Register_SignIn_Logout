import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  //Khi upload file qua thẻ input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change) $event được kích hoạt. Và tất cả file upload sẽ lưu trữ
  // trong $event.target.files.
  onFileChanged($event) {
    this.selectedFile = $event.target.files[0];
  }

  onUpload() {
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then(snapshot => {
      return snapshot.ref.getDownloadURL(); //Tra ve 1 chuoi sieu van ban tren FB.
    }).then(downloadURL => { //chuyen giao link tu nhung component khac nhau khi su upload
      this.downloadURL = downloadURL;
      this.giveURLtoCreate.emit(this.downloadURL);
      this.checkUploadAvatar = false;
      console.log(this.downloadURL);
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`);
      });
  }

}
