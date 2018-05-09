const input = `pphsv ojtou brvhsj cer ntfhlra udeh ccgtyzc zoyzmh jum lugbnk
vxjnf fzqitnj uyfck blnl impo kxoow nngd worcm bdesehw
vxjnf fzqitnj uyfck blnl impo kxoow nngd worcm bdesehw nngd
caibh nfuk kfnu llfdbz uxjty yxjut jcea`

const passphrases = input.split('\n')

const validPassphrases = passphrases.filter(
    string => {
        const words = string.split(' ')

        const object = words.reduce(
            (acc, word) => {
                acc[word] = true

                return  acc
            },
            {}
        )

        return Object.keys(object).length === words.length
    }
)

console.log(validPassphrases.length)
