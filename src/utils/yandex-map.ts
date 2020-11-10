import { TTaxi } from './../types/types';
import { Dispatch, SetStateAction } from "react";


export function createMap(ref: React.RefObject<HTMLDivElement>) {
	return new ymaps.Map(ref.current, {
		center: [56.856000, 53.217490],
		zoom: 9
	}, {
		searchControlProvider: 'yandex#search'
	});

}

export function getAddressByClick( myMap: any, setInputAddress: Dispatch<SetStateAction<string>>) {
	ymaps.ready(function init() {
		// Слушаем клик на карте.
		myMap.events.add('click', async (e: any) => {
			let coords = e.get('coords');

			const address: Promise<string> = getAddress(createPlacemark(coords), coords);
			setInputAddress(await address)
		});
	}
	);
}

// Создание метки.
export function createPlacemark(coords: any) {
	return new ymaps.Placemark(coords, {
	}, {
		preset: 'islands#greenIcon',
		draggable: true
	});
}

// Определяем адрес по координатам (обратное геокодирование).
async function getAddress(myPlacemark: any, coords: any) {
	myPlacemark.properties.set('iconCaption', 'поиск...');
	const address = ymaps.geocode(coords).then(async function (res: any) {
		let firstGeoObject = res.geoObjects.get(0);
		myPlacemark.properties
			.set({
				// Формируем строку с данными об объекте.
				iconCaption: [
					// Название населенного пункта или вышестоящее административно-территориальное образование.
					firstGeoObject.getLocalities().length
						? firstGeoObject.getLocalities()
						: firstGeoObject.getAdministrativeAreas(),
					// Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
					firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
				].filter(Boolean).join(', '),
				// В качестве контента балуна задаем строку с адресом объекта.
				balloonContent: firstGeoObject.getAddressLine()
			});
		return await firstGeoObject.getAddressLine()
	});
	return await address
}


export function getCoordinates(myMap: any, value: string) {
	return ymaps.geocode(value, { results: 1 })
		.then((res: any) => {
			let firstGeoObject = res.geoObjects.get(0)
			let coords = firstGeoObject.geometry.getCoordinates()
			let bounds = firstGeoObject.properties.get('boundedBy')
			let address = firstGeoObject.getAddressLine()
			firstGeoObject.options.set('preset', 'islands#yellowIcon');
			// Получаем строку с адресом и выводим в иконке геообъекта.
			firstGeoObject.properties.set('iconCaption', address);
			// Добавляем первый найденный геообъект на карту.
			myMap.geoObjects.removeAll()
			myMap.geoObjects.add(firstGeoObject);
			
			// Масштабируем карту на область видимости геообъекта.
			myMap.setBounds(bounds, {
				// Проверяем наличие тайлов на данном масштабе.
				checkZoomRange: true
			});
			return  {coords, address} 
		})
		
}

export async function setTaxiOnMap(myMap: any,taxi: TTaxi[]) {
	for await(let t of taxi) {
		const placemark = createPlacemark([t.lat,t.lon])
		await myMap.geoObjects.add(placemark);

		// await myMap.setBounds(bounds, {checkZoomRange: true })
	}
}