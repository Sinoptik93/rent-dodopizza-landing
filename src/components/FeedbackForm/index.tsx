import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import Modal from "@components/ui/Modal";
import InputField from "@components/ui/Input/Input";
import IconBuilding from "@assets/icons/icon-building.svg?react";

interface FeedbackFormProps {
    isOpen: boolean;
    isValid: boolean;
    onClose: (status: boolean) => void;
    address: string;
    city: string;
}

interface ScreenFirstProps {
    isValid: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const ScreenFirst = ({isValid, onDecline, onAccept}: ScreenFirstProps) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <p className="text-3xl">
                {
                    isValid
                        ? 'Ваш адрес подходит'
                        : 'Ваш адрес не входит в зону нашего поиска'
                }
            </p>

            <p>
                {
                    isValid
                        ? 'Хотите отправить заявку?'
                        : 'Все равно отправить заявку?'
                }
            </p>

            <div className="flex gap-4 self-stretch">
                <button
                    className={
                        twMerge(
                            "text-neutral-400 text-center bg-neutral-200 leading-snug whitespace-nowrap flex-1",
                            "rounded-lg py-2 px-3 text-sm",
                            "md:rounded-xl md:py-3 md:px-4",
                            "hover:bg-neutral-500 hover:text-white transition-colors",
                        )
                    }
                    onClick={onDecline}
                >
                    Отмена
                </button>

                <button
                    className={
                        twMerge(
                            "text-white text-center bg-orange leading-snug whitespace-nowrap flex-1",
                            "rounded-lg py-2 px-3 text-sm",
                            "md:rounded-xl md:py-3 md:px-4",
                            "hover:bg-orange-600 transition-colors",
                        )
                    }
                    onClick={onAccept}
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

interface ScreenSecondProps {
    address: string;
    city: string;
    included: boolean;
    onSend: ({status}: { status: 'success' | 'error' }) => void;
}

const ScreenSecond = ({address, city, included, onSend}: ScreenSecondProps) => {
    const [name, setName] = useState({isValid: true, value: ''});
    const [area, setArea] = useState({isValid: true, value: ''});
    const [phone, setPhone] = useState({isValid: true, value: ''});
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const handleSubmit = async (e: any) => {
        if (!name.value || !area.value || !phone.value) {
            return;
        };

        setIsSubmitDisabled(true);

        const ID =
            "AKfycbz8jx2M8IzYyNyhtlDPUfUsySth31cPy1zkl7gUyGkttoX9SkgMu0JX2QCpyN_KMxzx";

        const getUrl = (id: string) => `https://script.google.com/macros/s/${id}/exec`;
        const response = await fetch(getUrl(ID), {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                name: name.value,
                city,
                included,
                address,
                area: area.value,
                phone: phone.value,
                email,
                comments,
            }),
        }).then(async (data) => {
            return await data.json()
        });

        setIsSubmitDisabled(false);

        onSend(response)
    };

    return (
        <form
            className="flex flex-col gap-1"
        >
            <p className="text-2xl mb-2">Предложите помещение</p>

            <InputField
                label="Имя"
                value={name.value}
                isValid={name.isValid}
                onFocus={() => {
                    setName((prevValue) => ({...prevValue, isValid: true}))
                }}
                onBlur={(e) => {
                    setName((prevValue) => ({...prevValue, isValid: !!e.target.value}))
                }}
                onChange={(e) => setName({
                    value: e.target.value,
                    isValid: !!e.target.value
                })}

            />

            <InputField
                label="Адрес"
                value={address}
                onChange={(e) => {}}
            />
            <InputField
                label="Площадь"
                value={area.value}
                isValid={area.isValid}
                onFocus={(e) => {
                    setArea((prevValue) => ({...prevValue, isValid: true}))
                }}
                onBlur={(e) => {
                    setArea((prevValue) => ({...prevValue, isValid: !!e.target.value}))
                }}
                onChange={(e) => setArea({
                    value: e.target.value,
                    isValid: !!e.target.value
                })}
            />
            <InputField
                label="Телефон"
                value={phone.value}
                isValid={phone.isValid}
                onFocus={(e) => {
                    setPhone((prevValue) => ({...prevValue, isValid: true}))
                }}
                onBlur={(e) => {
                    setPhone((prevValue) => ({...prevValue, isValid: !!e.target.value}))
                }}
                onChange={(e) => setPhone({
                    value: e.target.value,
                    isValid: !!e.target.value
                })}
            />
            <InputField
                label="E-mail" value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label="Комментарий к помещению"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <button
                type="button"
                disabled={isSubmitDisabled}
                className={
                    twMerge(
                        "text-white text-center bg-orange leading-snug whitespace-nowrap flex-1",
                        "rounded-lg py-2 px-3 text-sm",
                        "md:rounded-xl md:py-3 md:px-4",
                        "hover:bg-orange-600 disabled:bg-neutral-400 transition-colors",
                    )
                }
                onClick={handleSubmit}
            >
                Отправить
            </button>
        </form>
    );
};

const ScreenThird = ({isValid}: { isValid: boolean }) => {
    return (
        <div className="flex flex-col gap-4 items-center py-8">
            <div className="size-14 bg-orange text-white rounded-xl p-2 ">
                <IconBuilding/>
            </div>

            <p className="text-6xl">Отправлено</p>

            {

                <div className="flex flex-col text-center gap-4">

                    {
                        isValid
                            ? (
                                <>
                                    <p>Спасибо за предложенное помещение!</p>
                                    <p>В ближайшее время мы свяжемся с вами и зададим уточняющие вопросы</p>
                                </>
                            )
                            : (
                                <>
                                    <p>Помещение которое вы предложили не входит в зону нашего поиска :(</p>
                                    <p>Если в будущем ситуация изменится, то мы обязательно с вами свяжемся.</p>
                                    <p>Спасибо!</p>
                                </>
                            )
                    }
                </div>
            }
        </div>
    )
}

const ScreenError = () => {
    return (
        <div className="flex flex-col gap-4 items-center py-8">
            <div className="size-14 bg-orange text-white rounded-xl p-2 ">
                <IconBuilding/>
            </div>

            <p className="text-6xl">Что-то пошло не так...</p>

            <div className="flex flex-col text-center gap-4">
                <p>Произошла ошибка.</p>
                <p>Ваша заявка не получена. Попробуйте <span className="text-orange"
                                                             onClick={() => window.location.reload()}>перезагрузить страницу</span> или
                    написать нам напрямую на почту:
                </p>
                <a className="text-orange" href="mailto:s.malyutenko@dodobrands.io ">s.malyutenko@dodobrands.io </a>
            </div>
        </div>
    )
}

const FeedbackForm = (
    {
        isOpen,
        onClose,
        address,
        city,
        isValid
    }: FeedbackFormProps) => {
    const [activeScreen, setActiveScreen] = useState(0);

    const handleClose = () => {
        onClose(false)
    }

    useEffect(() => {
        setActiveScreen(0);
    }, [isOpen]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                {
                    activeScreen === 0
                    && <ScreenFirst
                        isValid={isValid}
                        onAccept={() => setActiveScreen(1)}
                        onDecline={handleClose}
                    />
                }

                {
                    activeScreen === 1
                    && <ScreenSecond
                        address={address}
                        city={city}
                        included={isValid}
                        onSend={(response) => {
                            console.log(response)

                            response.status === 'success'
                                ? setActiveScreen(2)
                                : setActiveScreen(3)
                        }}
                    />
                }

                {
                    activeScreen === 2
                    && <ScreenThird isValid={isValid}/>
                }

                {
                    activeScreen === 3
                    && <ScreenError/>
                }
            </Modal>
        </>
    );
}

export default FeedbackForm;
