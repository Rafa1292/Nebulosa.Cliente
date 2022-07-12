import React, { useState, useRef } from 'react';
import { useAPI } from '../hooks/useInitialState';

const CategoryItem = ({ category, index, getCategories }) => {
    const { usePatch, useDelete } = useAPI();
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const name = useRef("");

    const updateCategory = async () => {
        const updateCategory = {
            categoriaDeProductoId: category.categoriaDeProductoId,
            nombre: name.current.value
        }
        const response = await usePatch('CategoriaDeProducto/Actualice', updateCategory);
        if (!response?.error) {
            category.nombre = name.current.value
            name.current.value = "";
            setEditMode(false);
        }
    }

    const deleteCategory = async () => {
        const response = await useDelete(`CategoriaDeProducto/Elimine?id=${category.categoriaDeProductoId}`);
        if (!response?.error) {
            await getCategories();
        }
    }

    return (
        <div className={`table-row ${index % 2 == 0 ? 'table-striped-row' : ''}`}>
            <div className="col-5 items-center center">
                {editMode ?
                    (
                        <>
                            <input
                                defaultValue={category.nombre}
                                type='text'
                                ref={name}
                                style={{
                                    background: 'rgba(0,0,0,0)',
                                    border: '1px solid rgba(0,0,0,.1)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    textAlign: 'center'
                                }} />
                        </>
                    )
                    :
                    (category.nombre)
                }

            </div>
            <div className="col-5 center items-center">
                <button onClick={() => setEditMode(!editMode)} className='col-sm-3 m-1 btn' type={'button'}>
                    Editar
                </button>
                {
                    editMode ?
                        (
                            <button onClick={() => updateCategory()} className='col-sm-3 btn m-1 success' type={'button'}>
                                Guardar
                            </button>
                        )
                        :
                        (
                            confirmDelete ?
                                (
                                    <button onClick={() => deleteCategory()} className='col-sm-3 btn m-1 black-outline' type={'button'}>
                                        Confirmar
                                    </button>
                                )
                                :
                                (
                                    <button onClick={() => setConfirmDelete(!confirmDelete)} className='col-sm-3 btn m-1 danger' type={'button'}>
                                        Eliminar
                                    </button>
                                )
                        )
                }

            </div>
        </div>
    );
}

export default CategoryItem;