import { Component } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { SuiLocalizationService } from "../../util/services/localization.service";
import { CalendarHoursItem } from "../directives/calendar-item";
import { Util } from "../../util/util";

@Component({
    selector: "sui-calendar-hour-view",
    template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead>
    <tr>
        <th colspan="4">
            <span class="link" (click)="zoomOut()">{{ date }}</span>
            <span class="prev link" (click)="prevDateRange()">
                <i class="chevron left icon"></i>
            </span>
            <span class="next link" (click)="nextDateRange()">
                <i class="chevron right icon"></i>
            </span>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of calculatedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
})
export class SuiCalendarHourView extends CalendarView {
    public get date():string {
        const month = this.localizationService
            .getValues().datepicker.months[this.renderedDate.getMonth()];
        const date = this.renderedDate.getDate();
        const year = this.renderedDate.getFullYear();

        return `${month} ${date}, ${year}`;
    }

    constructor(public localizationService:SuiLocalizationService) {
        super(CalendarViewType.Hour, 4);

        this.calculateItems();
    }

    public calculateItems():void {
        console.log(this.renderedDate);
        const dayStart = Util.Date.startOfDay(Util.Date.clone(this.renderedDate));
        const hours:CalendarHoursItem[] = [];

        Util.Array.range(24).forEach(h => {
            const date = Util.Date.clone(dayStart);
            date.setHours(h);

            const hR = `${Util.String.padLeft(date.getHours().toString(), 2, "0")}:00`;
            const isActive = !!this.selectedDate && Util.Date.hoursEqual(date, this.selectedDate);

            hours.push(new CalendarHoursItem(date, hR, false, isActive, false));
        });

        this.calculatedItems = Util.Array.group(hours, 4);
    }

    public nextDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() + 1);
        this.calculateItems();
    }

    public prevDateRange():void {
        this.renderedDate.setDate(this.renderedDate.getDate() - 1);
        this.calculateItems();
    }
}
