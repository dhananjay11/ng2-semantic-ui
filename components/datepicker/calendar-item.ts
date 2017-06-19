
import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import { DateUtils } from "./date-utils";

export interface ICalendarItem {
    associatedDate:Date;
    humanReadable:string;
    isDisabled:boolean;
    isActive:boolean;
}

@Directive({
    selector: "[calendarItem]"
})
export class SuiCalendarItem {
    @Input("calendarItem")
    public item:ICalendarItem;

    @HostBinding("class.disabled")
    public get isDisabled():boolean {
        return this.item.isDisabled;
    }

    @HostBinding("class.active")
    public get isActive():boolean {
        return this.item.isActive;
    }

    @HostBinding("class.today")
    public get isToday():boolean {
        return DateUtils.datesEqual(new Date(), this.item.associatedDate);
    }
}