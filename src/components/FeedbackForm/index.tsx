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
    onSend: () => void;
}

const ScreenSecond = ({address, onSend}: ScreenSecondProps) => {
    const [area, setArea] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        // Обработка отправки формы
        console.log('Отправка формы', e);
        console.log({address, area, phone, email, comment});
        onSend()
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1"
        >
            <p className="text-2xl mb-2">Предложите помещение</p>

            <InputField
                label="Адрес"
                value={address}
                onChange={(e) => {
                }}
            />
            <InputField
                label="Площадь"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />
            <InputField
                label="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <InputField
                label="E-mail" value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                label="Комментарий к помещению"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className={
                    twMerge(
                        "text-white text-center bg-orange leading-snug whitespace-nowrap flex-1",
                        "rounded-lg py-2 px-3 text-sm",
                        "md:rounded-xl md:py-3 md:px-4",
                        "hover:bg-orange-600 transition-colors",
                    )
                }
                onClick={() => {
                }}
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

const FeedbackForm = ({isOpen, onClose, address, isValid}: FeedbackFormProps) => {
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
                        onSend={() => setActiveScreen(2)}
                    />
                }

                {
                    activeScreen === 2
                    && <ScreenThird isValid={isValid}/>
                }
            </Modal>
        </>
    );
}

export default FeedbackForm;
