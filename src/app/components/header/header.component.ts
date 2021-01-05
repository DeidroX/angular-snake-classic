import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<h1>Snake Classic v1.2</h1><h2>- for mobile & desktop -</h2>',
  styles: ['h1,h2 {text-align: center; text-shadow: 4px 4px 8px black}'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
