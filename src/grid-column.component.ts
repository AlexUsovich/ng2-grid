import {
  Component,
  TemplateRef,
  Input,
  ContentChild,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';
import { StyleCallback } from './style-callback.interface';

/**
 * Grid column class.
 *
 * Defines a single Grid column with its properties inside the html template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
@Component({
  'selector': 'ng-grid-column',
  'template': ''
})
export class GridColumnComponent implements OnInit {
  static FILTER_TYPE_SELECT = 'select';
  static FILTER_TYPE_INPUT = 'input';

  static COLUMN_TYPE_STRING = 'string';
  static COLUMN_TYPE_NUMBER = 'number';

  static DEFAULT_CSS_CLASS_VALUE = '';
  static DEFAULT_FILTERING_VALUE = true;
  static DEFAULT_SORTING_VALUE = true;

  @Input() cellStyleCallback: StyleCallback;
  @Input() cssClass: string;
  @Input() heading: string;
  @Input() name: string;
  @Input() filtering: boolean;
  @Input() filterType: string;
  @Input() sorting: boolean;
  @Input() width: string;
  @Input() textAlign: string;
  @Input() type: string;
  @Input() items: any;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() sortOptions: Array<number>;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  /**
   * Handle OnInit event.
   */
  ngOnInit() {
    if (_.isUndefined(this.cssClass)) {
      this.cssClass = GridColumnComponent.DEFAULT_CSS_CLASS_VALUE;
    }
    if (_.isUndefined(this.filtering)) {
      this.filtering = GridColumnComponent.DEFAULT_FILTERING_VALUE;
    }
    if (_.isUndefined(this.filterType)) {
      this.filterType = GridColumnComponent.FILTER_TYPE_INPUT;
    }
    if (_.isUndefined(this.sorting)) {
      this.sorting = GridColumnComponent.DEFAULT_SORTING_VALUE;
    }
    if (_.isUndefined(this.type)) {
      this.type = GridColumnComponent.COLUMN_TYPE_STRING;
    }
    if (_.isUndefined(this.cellStyleCallback)) {
      this.cellStyleCallback = () => {
        return this.cssClass;
      };
    }
  }

  /**
   * Resolve grid heading value for this column.
   *
   * @returns {string}
   */
  resolveHeading(): string {
    return this.heading ? this.heading : this.name;
  }

  /**
   * Resolve grid cell value for given column name and data row.
   *
   * @param {any} data
   * @param {string} columnName
   *
   * @returns {string}
   */
  resolveCell(data: any, columnName: string = this.name): string {
      return _.get(data, columnName) as string;
  }
}
