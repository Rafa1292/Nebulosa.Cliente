import React, { useState, useEffect, useRef } from 'react';
import Title from '@components/Title';
import { useAPI } from '../../hooks/useInitialState';
import CategoryItem from '../../components/CategoryItem';

const Categories = () => {
    const { useGetList, usePost } = useAPI();
    const [categories, setCategories] = useState([]);
    const name = useRef("");
    
    const getCategories = async () => {
        const response = await useGetList('CategoriaDeProducto/Liste');
        if (!response.error) {
            setCategories(response.contenido);
        }
    }

    const addCategory = async () => {
        const response = await usePost('CategoriaDeProducto/Agregue', { nombre: name.current.value });
        if (!response?.error) {
            await getCategories();
            name.current.value = "";
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

            <div className="col-md-5 my-1 flex-wrap">
                {categories.map((category, index) => (
                   <CategoryItem 
                   key={category.categoriaDeProductoId}
                   getCategories={getCategories}
                   category={category} 
                   index={index} />
                ))}
            </div>
        </div>
    );
}

export default Categories;