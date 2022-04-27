import Layout from "../components/layout";
import router from "next/router";
import "../styles/Register.module.css";
import * as Auth from "../services/auth"
import React from "react";

export default function producerRegister() {
    const [checkedn, setCheckedn] = React.useState(false);
    const [checkedb, setCheckedb] = React.useState(false);
    const [checkedl, setCheckedl] = React.useState(false);
    const [checkeda, setCheckeda] = React.useState(false);
    const [checkedo, setCheckedo] = React.useState(false);


    const handleChangeN = () => { setCheckedn(!checkedn); };
    const handleChangeB = () => { setCheckedb(!checkedb); };
    const handleChangeL = () => { setCheckedl(!checkedl); };
    const handleChangeA = () => { setCheckeda(!checkeda); };
    const handleChangeO = () => { setCheckedo(!checkedo); };


    async function submit(e: any) {
        try {
            e.preventDefault();
            const fantasyName = e.target.fantasyName.value;
            const cnpj = e.target.cnpj.value;
            const externalWebPages = [e.target.externalWebPages.value];
            const producerPaymentMethods = [e.target.producerPaymentMethods.value];
            const productionRegion = e.target.productionRegion.value;
            const affiliatedEntities = e.target.affiliatedEntities.value;
            const certificationsAndRecords = e.target.certificationsAndRecords.value;
            const agroEcologicalCertifications = e.target.agroEcologicalCertifications.value;
            const productionsClassification = e.target.productionsClassification.value;
            const pAddres = {
                street: e.target.PRua.value,
                codeId: e.target.PBairro.value,
                cep: e.target.PCep.value,
                district: e.target.PMunicipio.value,
                county: e.target.PEstado.value
            }
            console.log("pADD ", pAddres)
            const cAddres = {
                street: e.target.CRua.value,
                codeId: e.target.CBairro.value,
                cep: e.target.CCep.value,
                district: e.target.CMunicipio.value,
                county: e.target.CEstado.value
            }

            const corpo = JSON.stringify({
                fantasyName: `${fantasyName}`,
                cnpj: `${cnpj}`,
                producerPaymentMethods: `${producerPaymentMethods}`,
                productionRegion: `${productionRegion}`,
                externalWebPages: `${externalWebPages}`,
                affiliatedEntities: `${affiliatedEntities}`,
                certificationsAndRecords: `${certificationsAndRecords}`,
                agroEcologicalCertifications: `${agroEcologicalCertifications}`,
                productionsClassification: `${productionsClassification}`,
                negotiateOnProductionSite: `${checkedn}`,
                businessIsCollective: `${checkedb}`,
                licensed: `${checkedl}`,
                agroEcological: `${checkeda}`,
                organic: `${checkedo}`,
                productionAddress: pAddres,
                businessAddress: cAddres,
            });

            console.log(corpo);
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: corpo,
            };
            const path = "register";
            const res = await fetch(`http://localhost:3000/${path}`, requestOptions);
            const resJson = await res.json();

            Auth.login(resJson.token)
            router.push({
                pathname: '/' // autenticado
            });

            router.push({
                pathname: '/login'
            });

            router.push({
                pathname: "/",
            });

            console.log(resJson);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout title="Cadastrar Produtor">
            <form action="/register" onSubmit={submit} id="producer-register-form">
                <div className="container mx-auto p-4 flex flex-col justify-content-center w-4/5">
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="fantasyName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="fantasyName"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nome Fantasia
                        </label>
                    </div>


                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="cnpj"
                            pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="cnpj"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            CNPJ (ex.: 12.345.678/0000-01)
                        </label>
                    </div>

                    <span className="font-bold">Endereço de Produção</span>
                    <div className="flex flex-wrap - mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PRua">
                                Rua
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="PRua"
                                type="text"
                                placeholder="Rua dos Pessegueiros" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PBairro">
                                Bairro
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="PBairro"
                                type="text"
                                placeholder="Conjunto das Oliveiras" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PMunicipio">
                                Municipio
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="PMunicipio"
                                type="text"
                                placeholder="São Paulo" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 mt-3 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PEstado">
                                Estado
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="PEstado">
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 mt-3 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="PCep">
                                Cep
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="PCep" type="text" placeholder="12345-678" />
                        </div>


                        <span className="font-bold mt-3 ">Endereço de Comercialização</span>
                        <div className="flex flex-wrap  mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="CRua">
                                    Rua
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="CRua"
                                    type="text"
                                    placeholder="Rua dos Pessegueiros" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="CBairro">
                                    Bairro
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="CBairro"
                                    type="text"
                                    placeholder="Capão" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="CMunicipio">
                                    Municipio
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="CMunicipio"
                                    type="text"
                                    placeholder="São Paulo" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 mt-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="CEstado">
                                    Estado
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="CEstado">
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                        <option value="EX">Estrangeiro</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 mt-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="CCep">
                                    Cep
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="CCep" type="text" placeholder="12345-678" />
                            </div >

                        </div>
                        <div className="relative z-0 mb-6 w-full group mt-3">
                            <input
                                type="text"
                                name="externalWebPages"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="externalWebPages"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Página Externa (Site)
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group ">
                            <input
                                type="text"
                                name="producerPaymentMethods"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="producerPaymentMethods"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Formas de Pagamento
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group ">
                            <input
                                type="text"
                                name="productionRegion"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="productionRegion"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Comunidade ou região de produção
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group ">
                            <input
                                type="text"
                                name="affiliatedEntities"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="affiliatedEntities"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                É cadastrado em alguma entidade? (listar entidades)
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group ">
                            <input
                                type="text"
                                name="certificationsAndRecords"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="certificationsAndRecords"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Registros ou Certificações
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group ">
                            <input
                                type="text"
                                name="agroEcologicalCertifications"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-800 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="agroEcologicalCertifications"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-focus:dark:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Certificados Agroecológicos
                            </label>
                        </div>

                        <div className="relative z-0 mb-6 w-full group">
                            <select
                                name="productionsClassification"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                                placeholder=" "
                            >
                                <option value="Desconhecido">Desconhecido</option>
                                <option value="Apicultura">Apicultura</option>
                                <option value="Cereais">Cereais</option>
                                <option value="Frutas">Frutas</option>
                                <option value="Hortaliças">Hortaliças</option>
                                <option value="Laticínios e derivados">
                                    Laticínios e derivados
                                </option>
                                <option value="Proteína de origem animal">
                                    Proteína de origem animal
                                </option>
                                <option value="Raizes e turbéculos">
                                    Raizes e turbéculos
                                </option>
                                <option value="Refeições">Refeições</option>
                                <option value="Sementes e mudas">Sementes e mudas</option>
                                <option value="Legumes">Legumes</option>
                                <option value="Panificação">Panificação</option>
                                <option value="Doces, mel, melado e geléias">
                                    Doces, mel, melado e geléias
                                </option>
                                <option value="Bebidas e polpas">Bebidas e polpas</option>
                                <option value="Chás e ervas">Chás e ervas</option>
                                <option value="Embutidos">Embutidos</option>
                                <option value="Conservas">Conservas</option>

                                {/* <option value="unknown">Desconhecido</option>
                    <option value="beekeeping">Apicultura</option>
                    <option value="cereals">Cereais</option>
                    <option value="fruits">Frutas</option>
                    <option value="vegetables">Hortaliças</option>
                    <option value="dairy">Laticínios e derivados,</option>
                    <option value="protein">Proteína de origem animal</option>
                    <option value="tubers">Raizes e turbéculos</option>
                    <option value="meals">Refeições</option>
                    <option value="seeds">Sementes e mudas</option>
                    <option value="legumes">Legumes</option>
                    <option value="bakery">Panificação</option>
                    <option value="sweets">Doces, mel, melado e geléias</option>
                    <option value="beverages">Bebidas e polpas</option>
                    <option value="herbs">Chás e ervas</option>
                    <option value="sausages">Embutidos</option>
                    <option value="preserves">Conservas</option> */}
                            </select>
                            <label
                                htmlFor="productionsClassification"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Tipo do produto
                            </label>
                        </div>

                        <div className="flex flex-col mb-3">
                            <div className="flex items-center mr-4">
                                <label htmlFor="negotiateOnProductionSite" className=" text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Atente no endereço de produção?</label>
                                <input id="negotiateOnProductionSite" type="checkbox" checked={checkedn} onChange={handleChangeN} name="negotiateOnProductionSite" value="" className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="flex items-center mr-4">
                                <label htmlFor="businessIsCollective" className=" text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Produtor Coletivo?</label>
                                <input id="businessIsCollective" type="checkbox" checked={checkedb} onChange={handleChangeB} name="businessIsCollective" value="" className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="flex items-center mr-4">
                                <label htmlFor="licensed" className=" text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Possui registro ou certificação?</label>
                                <input id="licensed" type="checkbox" name="licensed" checked={checkedl} onChange={handleChangeL} value="" className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="flex items-center mr-4">
                                <label htmlFor="agroEcological" className=" text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Agroecológico?</label>
                                <input id="agroEcological" type="checkbox" name="agroEcological" checked={checkeda} onChange={handleChangeA} value="" className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="flex items-center mr-4">
                                <label htmlFor="organic" className=" text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">A produção é Orgânica?</label>
                                <input id="organic" type="checkbox" name="organic" checked={checkedo} onChange={handleChangeO} value="" className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-emerald-700 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm w-full  px-3  py-2.5 item-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
