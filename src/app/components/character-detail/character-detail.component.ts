/**
 * Angular Imports
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

/**
 * Material Imports
 */
import { MatIconModule } from '@angular/material/icon';

/**
 * rxjs Imports
 */
import { Observable, takeWhile } from 'rxjs';
import { select, Store } from '@ngrx/store';

/**
 * store imports
 */
import { Favorite } from '../../store/favorite/favorite.reducer';
import { selectAllFavorites } from '../../store/favorite/favorite.selectors';
import { addFavorite, removeFavorite } from '../../store/favorite/favorite.actions';

/**
 * Services
 */
import { CharacterService } from '../../services/character.service';

/**
 * Models
 */
import { Character } from '../../models/character.model';



@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
  character: Character = {};

  /**
   * Variable to store CharacterId
   * @type {number}
   * @memberof CharacterDetailComponent
   */
  characterId: number = 0;

  /**
   * Variable to check if component is active or not
   * @type {boolean}
   * @memberof CharacterDetailComponent
   */
  compActive: boolean = true;

  /**
   * Favorite Observable
   * @type {Observable<Favorite[]>}
   * @memberof CharacterDetailComponent
   */
  favorite$: Observable<Favorite[]>;

  /**
   * Variable to check if character is favorite or not
   * @type {boolean}
   * @memberof CharacterDetailComponent
   */
  isFavorite: boolean = false;

  /**
   * Creates an instance of CharacterDetailComponent.
   * @param {ChangeDetectorRef} cd
   * @param {CharacterService} characterService
   * @param {ActivatedRoute} route
   * @param {Store} store
   * @memberof CharacterDetailComponent
   */
  constructor(
    private cd : ChangeDetectorRef,
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.favorite$ = this.store.pipe(select(selectAllFavorites));
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
   * Method to subscribe Character Details
   * @param {number} characterId
   * @memberof CharacterDetailComponent
   */
  subscribeCharacterDetails(characterId: number): void {
    this.characterService.getCharacterDetails(characterId).pipe(takeWhile(() => this.compActive)).subscribe(data => {
      this.character = data;
      this.characterId = characterId;
      this.subscribeFavoriteState();
      this.cd.detectChanges();
    });
  }

  /**
   * Method to subscribe favorite state
   * @memberof CharacterDetailComponent
   */
  subscribeFavoriteState(): void {
    this.store.pipe(select(selectAllFavorites)).pipe(takeWhile(()=> this.compActive)).subscribe(favorite => {
      this.isFavorite = favorite.some(favorite => favorite.characterId === this.characterId);
    });
  }

  /**
   * Method to toggle Favorite Character
   * @memberof CharacterDetailComponent
   */
  toggleFavorite() : void{
    this.isFavorite ? this.removeFavorite(this.characterId) : this.addFavorite();
  }

  /**
   * Method to add Favorite Character to store
   * @memberof CharacterDetailComponent
   */
  addFavorite() : void {
    const newFavorite: Favorite = { characterId: this.characterId, isFavorite: true };
    this.store.dispatch(addFavorite({ favorite: newFavorite }));
  }

  /**
   * Method to remove Favorite Character from store
   * @memberof CharacterDetailComponent
   */
  removeFavorite(characterId: number) : void {
    this.store.dispatch(removeFavorite({ characterId }));
  }
}
