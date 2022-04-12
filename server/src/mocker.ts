import * as falso from '@ngneat/falso';

// console.log(newProducer())

function paymentMethods() {
    return ["cx1","cx2","cx3"]
}

function phones() {
    return falso.randPhoneNumber({ length: falso.randNumber({ min: 1, max: 3}) })
}

function productionRegion() {
    return falso.randMovie()
}

function address() {
    return {
        street: falso.randStreetName(),
        codeId: falso.randAlpha() + falso.randNumber({ min: 10, max: 2000 }),
        district: falso.randLastName(),
        cep: falso.randZipCode(),
        county: falso.randCounty()
    }
}

function affiliatedEntities() {
    return falso.randCompanyName({ length: falso.randNumber({ min: 0, max: 3}) })
}

function cpfOrCnpj() {
    if(falso.randBoolean()){
        return( //XX. XXX. XXX/0001-XX.
            falso.randNumber({ min: 10000000,max: 99999999 })
            + "/0001-" +
            falso.randNumber({ max: 99 }).toString().padStart(2,"0")
        )
    }
    return (
        falso.randNumber({ min: 10000000000,max: 99999999999 }).toString()
    )
}

function certificationsAndRecords() {
    return falso.randAmericanFootballTeam({ length: falso.randNumber({ min: 0, max: 3}) })
}

function agroEcologicalCertifications() {
    return falso.rand(
        [
            "Cereais",
            "Frutas",
            "Hortaliças",
            "Legumes",
            "Laticínios ",
            "panificação",
            "doces, mel, melado e geléias ",
            "bebidas e polpas ",
            "carnes ",
            "Embutidos ",
            "Conservas1 ",
            "Chás e ervas ",
            "Macaxeira, Aipim, Batata e outras raízes"
        ],
        { length: falso.randNumber({ min: 0, max: 6}) }
    )
}
function externalWebPages() {
    return falso.randDomainName({ length: falso.randNumber({ min: 0, max: 3}) })
}

function productionsClassification(max = 6) {
    return falso.rand(
        [
            "Cereais",
            "Frutas",
            "Hortaliças",
            "Legumes",
            "Laticínios ",
            "panificação",
            "doces, mel, melado e geléias ",
            "bebidas e polpas ",
            "carnes ",
            "Embutidos ",
            "Conservas1 ",
            "Chás e ervas ",
            "Macaxeira, Aipim, Batata e outras raízes"
        ],
        { length: falso.randNumber({ min: 0, max: max}) }
    )
}

export function newProducer() {
    const producer = {
      id:0,
      name: falso.randFullName(),
      fantasyName: falso.randCompanyName(),
      email: falso.randEmail(),
      paymentMethods: paymentMethods(),
      phones: phones(),
      productionAddress : address(),
      productionRegion: productionRegion(),
      negotiateOnProductionSite: falso.randBoolean(),
      businessAddress : address(),
      businessIsCollective: falso.randBoolean(),
      geoReferencedLocalization: { lat: falso.randLatitude(), lng: falso.randLongitude() },
      affiliatedEntities: affiliatedEntities(),
      cpfOrCnpj: cpfOrCnpj(),
      licensed: falso.randBoolean(),
      certificationsAndRecords : certificationsAndRecords(),
      agroEcological: falso.randBoolean(),
      agroEcologicalCertifications : agroEcologicalCertifications(),
      organic: falso.randBoolean(),
      externalWebPages: externalWebPages(),
      productionsClassification: productionsClassification(),
    }
    return producer
}

export function newProduct(producerId: number) {
    const product = {
        id: 0,
        name: falso.randColor() + falso.randShape(),
        unitOfMeas: falso.rand(["Kg","unidade","cacho","pacote","caixa"], { length: 1 }), // the unitOfMeas username
        typology: productionsClassification(1),
        price: falso.randNumber({ min: 5, max: 50, precision: 0.5 }),
        specialDeliveryConditions: "",
        quantity : falso.randNumber({ min: 1, max: 50 }),
        cover: "",
        producerId: producerId,
    }
    return product
}