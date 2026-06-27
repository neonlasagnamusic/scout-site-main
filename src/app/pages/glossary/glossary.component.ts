import { Component } from '@angular/core';


@Component({
  selector: 'app-glossary',
  imports: [],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss'
})
export class GlossaryComponent {
  
  terms = [
    {
      term: 'Arrow of Light',
      definition: 'The sixth and highest rank in Cub Scouting. The Arrow of Light badge is the only Cub Scout badge that may be worn on the Scout uniform. Examples: "Arrow of Light badge," "Arrow of Light rank."'
    },
    {
      term: 'Bobcat',
      definition: 'The first rank earned by Cub Scouts who join after kindergarten.'
    },
    {
      term: 'campout',
      definition: 'A camping activity with at least one overnight stay.'
    },
    {
      term: 'chartered organization representative',
      definition: 'A manager of Scouting in a chartered organization who also represents this organization in the local council and district.'
    },
    {
      term: 'Cub Scout handshake',
      definition: 'Used by Cub Scouts and Cub Scouters; like an ordinary handshake with the right hand except that the index and middle fingers are extended toward the other person, touching the wrist.'
    },
    {
      term: 'Cub Scout Six Essentials',
      definition: 'These are a first-aid kit, flashlight, filled water bottle, trail food, sun protection, and whistle.'
    },
    {
      term: 'Cubmaster',
      definition: 'A volunteer Scouter, 21 or older, appointed by the chartered organization to lead a Cub Scout pack.'
    },
    {
      term: 'den',
      definition: 'A neighborhood group of four to eight Cub Scouts or Webelos Scouts that meets periodically, usually once a week, and is part of a Cub Scout pack.'
    },
    {
      term: 'denner',
      definition: 'A Cub Scout or Webelos Scout elected by his peers to help the den chief and den leader.'
    },
    {
      term: 'Scoutbook',
      definition: 'A unit-serving tool that includes an app called Scouting and allows leaders and parents to track individual advancement progress for their Scouts online or using their cellphone.'
    },
    {
      term: 'Scouter',
      definition: 'An adult registered with the Boy Scouts of America who serves in a volunteer or professional capacity.'
    },
  ];
}
