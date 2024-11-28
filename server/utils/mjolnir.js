export const generatePIN = () => {
    let pin = Math.floor(100000 + Math.random() * 900000);
    console.log(`PIN Generated: ${pin}`)
    return pin;
}