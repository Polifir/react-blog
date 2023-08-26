/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './Form.module.scss';
import { useForm } from 'react-hook-form';
import React from 'react';
import classNames from 'classnames';

export default function Form({ data, onSubmit }) {
  const {
    inputText,
    container,
    title,
    labelInput,
    inputDescr,
    CheckboxContainer,
    submitBtn,
    validateError,
    inputError,
  } = styles;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const matchPassword = () => {
    if (watch('repetPassword') !== watch('password')) {
      console.log('Пароли не совпадают!');
      console.log(errors);
      return false;
    }
    return true;
  };
  console.log(isSubmitting);
  return (
    <form className={container} onSubmit={handleSubmit(onSubmit)}>
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
              <>
                <label key={i} className={CheckboxContainer}>
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
              </>
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
              <React.Fragment key={i}>
                <label className={labelInput}>
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
                  />
                  {errors?.password && (
                    <span className={validateError}>
                      {errors?.password.message}
                    </span>
                  )}
                </label>
                <label key={i} className={labelInput}>
                  <span className={inputDescr}>Repet Password</span>
                  <input
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
              </React.Fragment>
            );
          case 'descr':
            return (
              <span key={i}>
                {e.name + ' '}
                <Link to={`/${e.label}`}>{e.link}</Link>
              </span>
            );
        }
      })}
    </form>
  );
}
