import { BehaviorSubject } from 'rxjs';
import { PokeDataService } from './../../../../../global/services/poke-data.service';
import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.sass']
})
export class LoadImageComponent implements OnInit {

  @ViewChild('imageProfileRef') imageProfileRef!: ElementRef;

  private baseHref!:String;

  imageProfile!: string;
  filename = 'Adjunta una foto';
  fileLoaded: BehaviorSubject<Boolean>;
  medalTrainer!:string;
  
  constructor(
    private platformLocation: PlatformLocation,
    public pokeDataService: PokeDataService
  ) {
    this.baseHref = environment.production ? this.platformLocation.getBaseHrefFromDOM() : '';
    this.imageProfile = this.baseHref + 'assets/img/image-profile.svg';
    this.fileLoaded = new BehaviorSubject<Boolean>(false);
    this.medalTrainer = this.baseHref + 'assets/img/medal-trainer.svg';
  }

  ngOnInit(): void {
  }

  processImage(image: any) {
    const file: File = image.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', 
      (event: any) => {

        this.imageProfileRef.nativeElement.style.paddingLeft = '0px';
        this.imageProfileRef.nativeElement.style.paddingRight = '0px';

        this.imageProfile = event.target.result;
        this.pokeDataService.imageProfile.next(event.target.result);
      }
    );
    this.filename = file.name;
    reader.readAsDataURL(file);
    this.fileLoaded.next(true);
  }

  calculateAge(birthday: any) {
    const ageDiff = Date.now() - new Date(birthday.format('YYYY-MM-DD')).getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
