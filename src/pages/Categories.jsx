import React, { useState, useEffect, useRef } from 'react';
import Title from '@components/Title';
import useAPI from '../hooks/useAPI';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const name = useRef("");
    const { useGetList, usePost } = useAPI();
    const getCategories = async () => {
        const response = await useGetList('CategoriaDeProducto/Liste');
        if (!response.error) {
            setCategories(response.contenido);
        }
        else {
            var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
            addError(message);
        }
    }

    const addCategory = async () => {
        const response = await usePost('CategoriaDeProducto/Agregue', { nombre: name.current.value });
        if (!response?.error) {
            await getCategories();
            name.current.value = "";
        }
        else {
            var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
            addError(message);
        }
    }

    useEffect(async () => {
        await getCategories();
    }, []);

    return (
        <div className="col-10 p-0 center d-flex flex-wrap">
            <Title title="Categorias" />

            <div className="col-10 my-2 center p-1">
                <input className='input col-sm-3' ref={name} placeholder='Nombre' />
                <div className="col-10 my-2 center">
                    <button className='col-sm-3 btn success' onClick={addCategory} type={'button'}>
                        Agregar
                    </button>
                </div>
            </div>

            <div className="col-md-4 my-1 flex-wrap">
                {categories.map((category, index) => (
                    <div key={category.categoriaDeProductoId} className={`table-row ${index % 2 == 0 ? 'table-striped-row' : ''}`}>
                        <div className="col-5 items-center center">
                            {category.nombre}
                        </div>
                        <div className="col-5 center items-center">
                            <button className='col-sm-3 m-1 btn' type={'button'}>
                                Editar
                            </button>
                            <button className='col-sm-3 btn m-1 danger' type={'button'}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;