import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: '<h3>~ Nino Righi, 02.01.2021</h3>',
  styles: ['h3 {text-align: center; font-weight: normal; font-style: italic;}'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
