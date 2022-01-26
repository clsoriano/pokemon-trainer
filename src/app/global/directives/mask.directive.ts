import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";

@Directive(
    {
        selector: '[maskDirective],.maskDirective',
        providers: [ NgModel ]
    }
)
export class MaskDirective {

    @Input() control !: any;
    @Output('maskDirectiveValueChange')
    public changeEmitter = new EventEmitter<string>();

    mask = '';
    maskRegExp = '';

    constructor(
        public ngControl: NgControl
    ) {
        
    }

    @HostListener('input', ['$event'])
    onInputChange(event: any): any {
        if (!event) return;
        
        let { target } = event;
        
        if (!target) return;

        let { value } = target;
        let newVal = value.replace(/[^A-za-z0-9.@,#/\- ]/g, '');

        if (this.control) {
            let {regex, maskDirective} = this.control;
            
            if (regex || maskDirective) newVal = this.maskTransform(newVal, target);
        }
        
        if (value !== newVal) this.ngControl.control?.setValue(newVal);

    }

    maskTransform(newVal: any, target?: any) {
        if (this.control.maskDirective) {
            let { mask: maskControl, regex } = this.control;

            let maskSeparator;
            const pos = target?.selectionStart;
            const foundMaskSeparator = maskControl.replace(/[A#]/g,'').replace(/(?:\{)(.*?)(?:\})/g,'');
            maskSeparator = foundMaskSeparator.charAt(0);
            this.mask = '';
            this.maskRegExp = '^';
            let count = 1;
            const regexMaskVal = new RegExp(maskSeparator, 'g');
            let valMask = maskControl.replace(regexMaskVal, '');
            const countMask = valMask.length;
            let dig = maskControl.split(maskSeparator);
            let vm = maskControl.match(new RegExp(/(?=\{)(.*?)(?=\})/g));

            if (vm) {
                for (let i = 0; i < vm.length; i++) {
                    let val = vm[i].replace('\{', '');
                    let f = val.split(',');

                    if (f[0] <= newVal.length && f[1] >= newVal.length){
                        this.maskRegExp += `(\\d{0,${ newVal.length }})`;
                        this.mask += `$${ i + 1 }${ maskSeparator }`;
                    } else {
                        this.maskRegExp += `(\\d{0,${ f[1] }})`;
                        this.mask += `$${ i + 1}${ maskSeparator }`;
                    }
                }
            } else {
                for (let i = 0; i < dig.length; i++) {
                    this.maskRegExp += `(\\d{0,${dig[i].length}})`;
                }

                const countVal = newVal.length;

                if (countVal === countMask && newVal.indexOf(maskSeparator) === -1) {
                    const val = maskControl.split(maskSeparator);
                    
                    for (const i of val) {
                        this.mask += `$${count}${maskSeparator}`;
                        count++;
                    }
                    this.mask = this.mask.substring(0, this.mask.length - 1);
                } else {
                    count++;
                    this.mask = '$1';
                    for (let i = 0; i < countVal; i++) {
                        if (maskControl.charAt(i) === maskSeparator) {
                            this.mask += `${maskSeparator}$${count}`;
                            count++;
                        }
                    }
                }
                
                newVal = newVal.replace(regexMaskVal, '');
                
                if(maskControl.indexOf('A') === -1) newVal =  newVal.replace(/\D/g, '');

                if (regex) newVal = newVal.replace(new RegExp(regex, 'g'), '');
                
                newVal = newVal.replace(new RegExp(this.maskRegExp, 'g'), this.mask);
            }

            if (maskSeparator && (newVal.lastIndexOf(maskSeparator) + 1) === newVal.length && pos === (newVal.length - 1)) {
                setTimeout(()=> { target?.setSelectionRange(newVal.length - 1,  newVal.length - 1)});
            } else {
                setTimeout(()=> { 
                    let c = (pos === (newVal.length - 1) ? (pos + 1):  pos);
                    target?.setSelectionRange(c, c);
                });
            }
        }

        return newVal;
    }


    private updateValue(value: string){
        this.changeEmitter.emit(value);
        MaskDirective.delay().then(
            () => this.ngControl.control?.updateValueAndValidity()
        );
    }

    private static delay(ms: number = 0){
        return new Promise<string>(resolve => setTimeout( () => resolve('Success'), ms)).then(() => '');
    }

}