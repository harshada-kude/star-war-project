/**
 * Angular Imports
 */
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

/**
 * Material Imports
 */
import { MatIconModule } from '@angular/material/icon';

/**
 * rxjs Imports
 */
import { takeWhile } from 'rxjs';


/**
 * Services
 */
import { CharacterDetailService } from '../../services/character-detail.service';
import { FavoriteService } from '../../services/favorite.service';

/**
 * Models
 */
import { Character } from '../../models/character.model';

/**
 * Custom Library
 */
import { StarWarLoaderComponent } from 'star-war-loader';

/**
 * Shared Component
 */
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';



@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, StarWarLoaderComponent, ToolbarComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent implements OnInit, OnDestroy {

  /**
   * Variable to store Character
   * @type {Character}
   * @memberof CharacterDetailComponent
   */
  public character: Character = {};

  /**
   * Variable to store CharacterId
   * @type {number}
   * @memberof CharacterDetailComponent
   */
  private characterId: number = 0;

  /**
   * Variable to check if component is active or not
   * @type {boolean}
   * @memberof CharacterDetailComponent
   */
  private compActive: boolean = true;

  /**
   * Variable to check if character is favorite or not
   * @type {boolean}
   * @memberof CharacterDetailComponent
   */
  public isFavorite: boolean = false;

  /**
   * isLoading flag
   * @type {boolean}
   * @memberof CharacterListComponent
   */
  public isLoading: boolean = false;

  /**
   * Creates an instance of CharacterDetailComponent.
   * @param {ChangeDetectorRef} cd
   * @param {characterDetailService} characterDetailService
   * @param {FavoriteService} favoriteServ
   * @param {Location} location
   * @param {ActivatedRoute} route
   * @memberof CharacterDetailComponent
   */
  constructor(
    private cd : ChangeDetectorRef,
    private characterDetailService: CharacterDetailService,
    private favoriteServ: FavoriteService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.loadFavoriteFromSession();
  }

  /**
   * Angular life cycle hook for component initialization
   * @memberof CharacterDetailComponent
   */
  ngOnInit() {
    this.subscribeCharacterDetails(this.route.snapshot.params['id']);
  }

  /**
   * Angular life cycle hook on component destruction
   * @memberof CharacterDetailComponent
   */
  ngOnDestroy(): void {
      this.compActive = false;
  }

  /**
   * Method to load Favorite from Session
   * @memberof CharacterDetailComponent
   */
  private loadFavoriteFromSession(): void {
    this.favoriteServ.loadFavoriteFromSession();
  }

  /**
   * Method to subscribe Character Details
   * @param {number} characterId
   * @memberof CharacterDetailComponent
   */
  private subscribeCharacterDetails(characterId: number): void {
    this.isLoading = true;
    this.characterDetailService.getCharacterDetails(characterId).pipe(takeWhile(() => this.compActive)).subscribe(data => {
      this.character = data;
      this.characterId = characterId;
      this.subscribeFavoriteState();
      this.isLoading = false;
      this.cd.detectChanges();
    });
  }

  /**
   * Method to subscribe favorite state
   * @memberof CharacterDetailComponent
   */
  private subscribeFavoriteState(): void {
    this.favoriteServ.getFavorite().pipe(takeWhile(()=> this.compActive)).subscribe(favorites => {
      this.isFavorite = favorites.some(favorite => favorite.characterId === this.characterId);
    });
  }

  /**
   * Method to toggle Favorite Character
   * @memberof CharacterDetailComponent
   */
  public toggleFavorite() : void{
    this.isFavorite ? this.removeFavorite(this.characterId) : this.addFavorite();
  }

  /**
   * Method to add Favorite Character to store
   * @memberof CharacterDetailComponent
   */
  private addFavorite() : void {
    this.favoriteServ.addFavorite(this.characterId, true);
  }

  /**
   * Method to remove Favorite Character from store
   * @memberof CharacterDetailComponent
   */
  private removeFavorite(characterId: number) : void {
    this.favoriteServ.removeFavorite(characterId);
  }

  /**
   * Method to nagigate Back
   * @memberof CharacterDetailComponent
   */
  public navigateBack(): void {
    this.location.back();
  }
}
