import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  template: `
    <div class="toast" [class.show]="show">
      <div class="img">
        <img src="/assets/icons/icon-72x72.png" />
      </div>
      <div class="desc">
        A new update is available!
        <br/>
        You can reload with the button below.
        <br/>
        <button (click)="reload()">Reload</button>
      </div>
    </div>
  `,
  styleUrls: [ './toaster.styles.scss' ]
})
export class ToasterComponent {
  @Input() show = false;

  reload() {
    document.location.reload();
  }
}
