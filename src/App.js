import React, { Component, createRef } from 'react';
import './App.scss';
import CustomizedTextField from './components/CustomizedTextField';
import CustomizedButton from './components/CustomizedButton';
import CustomizedSelect from './components/CustomizedSelect';
import CustomizedUpload from './components/CustomizedUpload';
import MenuItem from '@material-ui/core/MenuItem';
import CustomizedSnackbar from './components/CustomizedSnackbar';

import TextMaskCustom from './components/TextMaskCustom';

import { host_cities, child_ages, experience_of_filming } from './data';

// CWFF => 'Childrens Weather Forecast Form'
class App extends Component {
	constructor() {
		super();
		this.state = {
			notSelectedPlaceholder: 'Не выбрано',

			residenceCity: '',
			hostCity: '',
			childFullName: '',
			childAge: '',
			accompanyingFullName: '',
			accompanyingPhone: '',
			accompanyingEmail: '',
			experienceOfFilming: '',

			files: [],
			maxFilesLength: 2,
			formValid: false,
			snackbar: {
				openSnackbar: false,
				responseStatus: 'error',
				messageSnackbar: 'Спасибо! Ваша заявка отправлена!'
			}
		};
		this.constructor.onSelect = this.constructor.onSelect.bind(this);
		this.constructor.onSubmit = this.constructor.onSubmit.bind(this);
		this.constructor.onFilesChoose = this.constructor.onFilesChoose.bind(
			this
		);
		this.constructor.onFileDelete = this.constructor.onFileDelete.bind(
			this
		);
		this.constructor.validate = this.constructor.validate.bind(this);
		this.constructor.onField = this.constructor.onField.bind(this);

		this.formRef = createRef();
		this.experienceOfFilmingRef = createRef(); // Uncaught bug with required attribute =(
	}
	componentDidMount() {
		const { validate } = App;
		validate();
	}
	snackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({
			snackbar: {
				...this.state.snackbar,
				openSnackbar: false
			}
		});
	};
	static onFileDelete(id) {
		const { validate } = App;
		const { files } = this.state;
		this.setState(
			{
				files: files.filter(file => file.id !== id)
			},
			() => {
				document.getElementById(id).value = '';
				validate();
			}
		);
	}

	static onFilesChoose(e) {
		console.log(e);

		const { validate } = App;
		const { files, maxFilesLength } = this.state;

		let readyFiles = Array.from(e.target.files).filter(file =>
			file.type.includes('image')
		);
		readyFiles.forEach(file => (file.id = e.target.id));
		readyFiles = files.concat(readyFiles).slice(0, maxFilesLength);

		if (readyFiles.length) this.setState({ files: readyFiles }, validate);
	}
	static onSubmit(e) {
		e.preventDefault();
		const formElement = document.querySelector('form');
		const formData = new FormData(formElement);
		const url = window.location.href;
		//send to server form data
		fetch(url, {
			method: 'post',
			body: formData
		})
			.then(function(response) {
				if (response.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' +
							response.status
					);
					this.setState({
						snackbar: {
							...this.state.snackbar,
							openSnackbar: true,
							responseStatus: 'error',
							messageSnackbar: response.status
						}
					});
					return;
				}
				response.json().then(function(data) {
					console.log(data);
					this.setState({
						snackbar: {
							...this.state.snackbar,
							openSnackbar: true,
							responseStatus: 'success',
							messageSnackbar: 'Спасибо! Ваша заявка отправлена!'
						}
					});
				});
			})
			.catch(
				function(err) {
					console.log('Fetch Error :-S', err);
					this.setState({
						snackbar: {
							...this.state.snackbar,
							openSnackbar: true,
							responseStatus: 'success', // change to success
							messageSnackbar:
								'Попробуйте отправить заявку позже!'
						}
					});
				}.bind(this)
			);
	}
	static onSelect(e) {
		const { validate } = App;
		const { value, name } = e.target;
		this.setState(
			{
				[name]: value
			},
			validate
		);
	}
	static onField(e) {
		const { validate } = App;
		const { value, name } = e.target;
		this.setState(
			{
				[name]: value
			},
			validate
		);
	}
	static validate() {
		console.log('Validate');
		const { formRef, experienceOfFilmingRef } = this;
		console.log(formRef);
		this.setState({
			formValid:
				formRef.current.checkValidity() &&
				experienceOfFilmingRef.current.props.value
		});
	}
	render() {
		const { formRef, experienceOfFilmingRef } = this;

		const {
			onSelect,
			onSubmit,
			onField,
			onFilesChoose,
			onFileDelete
		} = App;
		const {
			notSelectedPlaceholder,

			residenceCity,
			hostCity,
			childFullName,
			childAge,
			accompanyingFullName,
			accompanyingPhone,
			accompanyingEmail,
			experienceOfFilming,

			files,
			maxFilesLength,
			formValid
		} = this.state;
		return (
			<div className='cwff-app'>
				<div className='cwff-app__container'>
					<div className='cwff-scenery cwff-app__scenery'>
						<div className='cwff-scenery__former' />
						<div className='cwff-scenery__filler' />
					</div>
					<form
						ref={formRef}
						name='cwffForm'
						className='cwff-form cwff-app__form'
						action='https://superkanal.ru/casting-test'
						onSubmit={onSubmit}
						method='post'
						encType='multipart/form-data'
						noValidate>
						<div className='cwff-form__overflow'>
							<div className='cwff-form__container'>
								<h2 className='cwff-form__title'>
									прием заявок
								</h2>
								<p className='cwff-form__subtitle'>
									Обязательно заполните каждый пункт анкеты.
									Если ваша заявка понравится
									кастинг-директору, с вами свяжутся по
									электронной почте или телефону.
								</p>
								<CustomizedTextField
									id='residence-city'
									name='residenceCity'
									label='Город проживания'
									fullWidth={true}
									margin='normal'
									onChange={onField}
									value={residenceCity}
									pattern='(?:.){1,255}'
									required
								/>
								<CustomizedSelect
									id='host-city'
									name='hostCity'
									label='Город в который вы готовы приехать'
									fullWidth={true}
									margin='normal'
									onChange={onSelect}
									value={hostCity}
									pattern='(?:.){1,255}'
									required>
									{[
										{ label: '', value: '' },
										...host_cities
									].map(city => (
										<MenuItem
											key={city.value}
											value={city.value}>
											{city.label ? (
												city.label
											) : (
												<em>
													{notSelectedPlaceholder}
												</em>
											)}
										</MenuItem>
									))}
								</CustomizedSelect>
								<CustomizedTextField
									id='child-full-name'
									name='childFullName'
									label='ФИО ребенка'
									fullWidth={true}
									margin='normal'
									onChange={onField}
									value={childFullName}
									pattern='(?:.){1,255}'
									required
								/>
								<CustomizedSelect
									id='child-age'
									name='childAge'
									label='Возраст ребенка'
									fullWidth={true}
									margin='normal'
									onChange={onSelect}
									value={childAge}
									pattern='(?:.){1,255}'
									required>
									{[
										{ label: '', value: '' },
										...child_ages
									].map(age => (
										<MenuItem
											key={age.value}
											value={age.value}>
											{age.label ? (
												age.label
											) : (
												<em>
													{notSelectedPlaceholder}
												</em>
											)}
										</MenuItem>
									))}
								</CustomizedSelect>
								<CustomizedTextField
									id='accompanying-full-name'
									name='accompanyingFullName'
									label='ФИО сопровождающего'
									fullWidth={true}
									margin='normal'
									onChange={onField}
									value={accompanyingFullName}
									pattern='(?:.){1,255}'
									required
								/>
								<CustomizedTextField
									id='accompanying-phone'
									name='accompanyingPhone'
									fullWidth={true}
									label='Телефон сопровождающего'
									margin='normal'
									InputProps={{
										inputComponent: TextMaskCustom
									}}
									onChange={onField}
									type='tel'
									value={accompanyingPhone}
									pattern='\+\d\s\d{3}\s\d{3}\s\d{2}\s\d{2}'
									required
								/>
								<CustomizedTextField
									id='accompanying-email'
									name='accompanyingEmail'
									label='Электронная почта сопровождающего'
									fullWidth={true}
									type='email'
									InputLabelProps={{
										style: {
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											maxWidth: '100%'
										}
									}}
									margin='normal'
									value={accompanyingEmail}
									onChange={onField}
									required
								/>
								<CustomizedUpload
									accept='image/*'
									id='child-photo'
									name='childPhoto'
									type='file'
									files={files}
									maxFilesLength={maxFilesLength}
									onFilesChoose={onFilesChoose}
									onFileDelete={onFileDelete}
									hidden
								/>
								<CustomizedSelect
									id='experience-of-filming'
									name='experienceOfFilming'
									label='Опыт съемок'
									fullWidth={true}
									margin='normal'
									onChange={onSelect}
									value={experienceOfFilming}
									pattern='(?:.){1,255}'
									ref={experienceOfFilmingRef}
									required>
									{[
										{ label: '', value: '' },
										...experience_of_filming
									].map(experience => (
										<MenuItem
											key={experience.value}
											value={experience.value}>
											{experience.label ? (
												experience.label
											) : (
												<em>
													{notSelectedPlaceholder}
												</em>
											)}
										</MenuItem>
									))}
								</CustomizedSelect>
								<CustomizedButton
									type='submit'
									variant='contained'
									color='primary'
									fullWidth={true}
									size='large'
									disabled={!formValid}>
									отправить
								</CustomizedButton>
							</div>
						</div> 
					</form>
					<CustomizedSnackbar
						open={this.state.snackbar.openSnackbar}
						onClose={this.snackbarClose}
						variant={this.state.snackbar.responseStatus}
						message={this.state.snackbar.messageSnackbar}
					/>
				</div>
			</div>
		);
	}
}

export default App;
