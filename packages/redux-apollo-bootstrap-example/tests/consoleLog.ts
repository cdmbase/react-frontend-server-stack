export default (title: string, ...values: any[]): void => {

    title && console.log(title);
    values.forEach((item): void => {
        if (("[object Object]" === "" + item) || (typeof item === "function")) {
            for (let prop in item) {
                console.log(title + "." + prop, "=",item[prop], " type of ", typeof item[prop])
            }
        }
        //else if ( ) { }
        else { console.log(item) };
    });
};