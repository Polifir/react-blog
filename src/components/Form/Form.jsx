/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './Form.module.scss';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export default function Form({ data, onSubmit, type }) {
  const {
    inputText,
    userContainer,
    title,
    labelInput,
    inputDescr,
    CheckboxContainer,
    submitBtn,
    validateError,
    inputError,
    articleContainer,
    inputTextArea,
    tags,
    tagsContainer,
    buttonDelete,
    buttonAdd,
  } = styles;
  const [tagsInput, setAddtagsInput] = useState([]);

  useEffect(() => {
    if (type === 'article') {
      setAddtagsInput([...data[4].defaultValue]);
    }
  }, []);

  const addTags = () => {
    setAddtagsInput([...tagsInput, []]);
  };
  const deleteTags = (index) => {
    setAddtagsInput(tagsInput.filter((e, i) => (i === index ? false : true)));
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const matchPassword = () => {
    if (watch('repetPassword') !== watch('password')) {
      return false;
    }
    return true;
  };
  return (
    <form
      className={type === 'article' ? articleContainer : userContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      {data.map((e, i) => {
        switch (e.type) {
          case 'title':
            return (
              <h2 className={title} key={i}>
                {e.name}
              </h2>
            );
          case 'input':
            return (
              <label key={i} className={labelInput}>
                <span className={inputDescr}>{e.name}</span>
                <input
                  defaultValue={e.defaultValue}
                  className={classNames(inputText, [
                    errors[e.label] ? inputError : false,
                  ])}
                  {...register(e.label, e.validate)}
                  placeholder={e.name}
                />
                {errors[e.label] && (
                  <span className={validateError}>
                    {errors[e.label].message}
                  </span>
                )}
              </label>
            );
          case 'checkbox':
            return (
              <React.Fragment key={i}>
                <label className={CheckboxContainer}>
                  <input
                    className={classNames(inputText, [
                      errors[e.label] ? inputError : false,
                    ])}
                    {...register(e.label, e.validate)}
                    placeholder={e.name}
                    type='checkbox'
                  />
                  <span className={inputDescr}>{e.name}</span>
                </label>
                {errors[e.label] && (
                  <p className={validateError}>{errors[e.label].message}</p>
                )}
              </React.Fragment>
            );
          case 'button':
            return (
              <input
                className={submitBtn}
                type='submit'
                value={e.name}
                key={i}
              />
            );
          case 'repetPassword':
            return (
              <p key={i}>
                <label key={`${i} 'password'`} className={labelInput}>
                  <span className={inputDescr}>{e.name}</span>
                  <input
                    className={classNames(inputText, [
                      errors?.password ? inputError : false,
                    ])}
                    {...register('password', {
                      required: 'Обязательное поле',
                      minLength: {
                        value: 6,
                        message: 'Минимальный размер 6 символов',
                      },
                      maxLength: {
                        value: 40,
                        message: 'Максимальная длина 40 символов',
                      },
                    })}
                    placeholder={e.name}
                    type='password'
                  />
                  {errors?.password && (
                    <span className={validateError}>
                      {errors?.password.message}
                    </span>
                  )}
                </label>
                <label key={i + 'repeatPassword'} className={labelInput}>
                  <span className={inputDescr}>Repet Password</span>
                  <input
                    type='password'
                    className={classNames(inputText, [
                      errors?.password ? inputError : false,
                    ])}
                    {...register('repetPassword', {
                      required: 'Обязательное поле',
                      minLength: {
                        value: 6,
                        message: 'Минимальный размер 6 символов',
                      },
                      validate: (val) => {
                        matchPassword(val);
                      },
                    })}
                    placeholder={'Repet Password'}
                  />
                  {!matchPassword() && (
                    <span className={validateError}>Пароли не совпадают</span>
                  )}
                </label>
              </p>
            );
          case 'descr':
            return (
              <span key={i}>
                {e.name + ' '}
                <Link to={`/${e.label}`}>{e.link}</Link>
              </span>
            );
          case 'text':
            return (
              <label className={labelInput} key={i}>
                <span className={inputDescr}>{e.name}</span>
                <textarea
                  type={'text'}
                  defaultValue={e.defaultValue}
                  className={classNames(inputTextArea, [
                    errors[e.label] ? inputError : false,
                  ])}
                  {...register(e.label, e.validate)}
                  placeholder={e.name}
                />
                {errors[e.label] && (
                  <span className={validateError}>
                    {errors[e.label].message}
                  </span>
                )}
              </label>
            );
          case 'tags':
            return (
              <div className={tags} key={i}>
                <span className={inputDescr}>{e.name}</span>
                {tagsInput.length ? (
                  tagsInput.map((tag, i) => (
                    <React.Fragment key={i}>
                      <div className={tagsContainer}>
                        <input
                          defaultValue={tag}
                          className={classNames(inputText, [
                            errors[e.label] ? inputError : false,
                          ])}
                          {...register(`${e.label}.${i}`, e.validate)}
                          placeholder={e.name}
                        />
                        <button
                          className={buttonDelete}
                          type='button'
                          onClick={() => deleteTags(i)}
                        >
                          Delete
                        </button>
                        {i === tagsInput.length - 1 && (
                          <button
                            className={buttonAdd}
                            onClick={addTags}
                            type='button'
                          >
                            Add
                          </button>
                        )}
                      </div>
                      {errors[e.label] && (
                        <span className={validateError}>
                          {errors[e.label].message}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <button className={buttonAdd} onClick={addTags} type='button'>
                    Add
                  </button>
                )}
              </div>
            );
        }
      })}
    </form>
  );
}
