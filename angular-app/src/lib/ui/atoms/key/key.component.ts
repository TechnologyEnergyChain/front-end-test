import {Component, Input} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  standalone: true,
  selector: 'a-key',
  templateUrl: 'key.component.html',
  styleUrls: ['key.component.css'],

  imports: [
    NgClass
  ]
})
export class KeyComponent {
  @Input() key?: string
  @Input() isActive?: boolean

  setKeyCssClass(): Record<string, boolean> {
    return {
      'disabled': !this.isActive
    }
  }
}
